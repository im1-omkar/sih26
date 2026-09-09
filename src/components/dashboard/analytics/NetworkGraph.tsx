import { useRef, useEffect, useCallback, useState } from "react";
import { forceSimulation, forceLink, forceManyBody, forceCenter, forceCollide } from "d3-force";
import type { SimulationNodeDatum, SimulationLinkDatum } from "d3-force";

interface NetworkNode extends SimulationNodeDatum {
    id: string;
    label: string;
    type: string;
    badge?: string;
    risk_score?: number;
}

interface NetworkLink extends SimulationLinkDatum<NetworkNode> {
    id: string;
    source: string | NetworkNode;
    target: string | NetworkNode;
    label: string;
    color?: string;
    style?: string;
    weight?: number;
}

interface NetworkGraphProps {
    data: {
        nodes: any[];
        edges: any[];
    };
    onNodeClick: (nodeId: string) => void;
    theme?: "financial" | "digital" | "communication" | "evidence" | "default";
}

const THEME_COLORS: Record<string, Record<string, { fill: string; stroke: string }>> = {
    financial: {
        company: { fill: "#059669", stroke: "#047857" }, // deep green
        bank_account: { fill: "#10b981", stroke: "#059669" }, // emerald
        person: { fill: "#34d399", stroke: "#10b981" }, // light green
        phone: { fill: "#059669", stroke: "#047857" },
        wallet: { fill: "#047857", stroke: "#064e3b" }, // dark green
        device: { fill: "#6ee7b7", stroke: "#34d399" },
        default: { fill: "#10b981", stroke: "#059669" }
    },
    digital: {
        company: { fill: "#0284c7", stroke: "#0369a1" }, // sky
        bank_account: { fill: "#0ea5e9", stroke: "#0284c7" },
        person: { fill: "#38bdf8", stroke: "#0ea5e9" },
        phone: { fill: "#0ea5e9", stroke: "#0284c7" },
        wallet: { fill: "#0369a1", stroke: "#075985" },
        device: { fill: "#0284c7", stroke: "#0369a1" },
        default: { fill: "#38bdf8", stroke: "#0ea5e9" }
    },
    communication: {
        company: { fill: "#7c3aed", stroke: "#6d28d9" }, // violet
        bank_account: { fill: "#8b5cf6", stroke: "#7c3aed" },
        person: { fill: "#a78bfa", stroke: "#8b5cf6" },
        phone: { fill: "#6d28d9", stroke: "#5b21b6" },
        wallet: { fill: "#5b21b6", stroke: "#4c1d95" },
        device: { fill: "#8b5cf6", stroke: "#7c3aed" },
        default: { fill: "#a78bfa", stroke: "#8b5cf6" }
    },
    evidence: {
        company: { fill: "#d97706", stroke: "#b45309" }, // amber
        bank_account: { fill: "#f59e0b", stroke: "#d97706" },
        person: { fill: "#fbbf24", stroke: "#f59e0b" },
        phone: { fill: "#b45309", stroke: "#92400e" },
        wallet: { fill: "#92400e", stroke: "#78350f" },
        device: { fill: "#f59e0b", stroke: "#d97706" },
        default: { fill: "#fbbf24", stroke: "#f59e0b" }
    },
    default: {
        company: { fill: "#f59e0b", stroke: "#d97706" }, 
        bank_account: { fill: "#10b981", stroke: "#059669" }, 
        person: { fill: "#3b82f6", stroke: "#2563eb" }, 
        phone: { fill: "#8b5cf6", stroke: "#7c3aed" }, 
        wallet: { fill: "#f43f5e", stroke: "#e11d48" }, 
        device: { fill: "#64748b", stroke: "#475569" }, 
        default: { fill: "#94a3b8", stroke: "#64748b" }
    }
};

const NODE_RADIUS = 24;

export default function NetworkGraph({ data, onNodeClick, theme = "default" }: NetworkGraphProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const [, setHoveredNode] = useState<string | null>(null);

    const rawNodes = data.nodes.map((n: any) => ({ ...n }));
    const rawLinks = data.edges.map((e: any) => ({ ...e }));

    const nodesRef = useRef<NetworkNode[]>(rawNodes);
    const linksRef = useRef<NetworkLink[]>(rawLinks);
    
    const transformRef = useRef({ x: 0, y: 0, k: 1 });
    const hoveredRef = useRef<string | null>(null);

    const hitTest = useCallback((mx: number, my: number): NetworkNode | null => {
        const t = transformRef.current;
        const wx = (mx - t.x) / t.k;
        const wy = (my - t.y) / t.k;

        for (let i = nodesRef.current.length - 1; i >= 0; i--) {
            const n = nodesRef.current[i];
            const dx = (n.x ?? 0) - wx;
            const dy = (n.y ?? 0) - wy;
            if (dx * dx + dy * dy <= NODE_RADIUS * NODE_RADIUS) return n;
        }
        return null;
    }, []);

    const render = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        ctx.save();
        ctx.resetTransform();
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.restore();

        const { x, y, k } = transformRef.current;
        ctx.save();
        ctx.translate(x, y);
        ctx.scale(k, k);

        // Clamp positions to bounds (prevent flying out)
        for (const node of nodesRef.current) {
            if (node.x == null || node.y == null) continue;
            const padding = NODE_RADIUS + 10;
            const hw = canvas.width / (2 * k) - padding;
            const hh = canvas.height / (2 * k) - padding;
            // The simulation is centered at 0,0
            if (node.x > hw) node.x = hw;
            if (node.x < -hw) node.x = -hw;
            if (node.y > hh) node.y = hh;
            if (node.y < -hh) node.y = -hh;
        }

        // Edges
        for (const link of linksRef.current) {
            const s = link.source as NetworkNode;
            const e = link.target as NetworkNode;
            if (s.x == null || s.y == null || e.x == null || e.y == null) continue;

            const dx = e.x - s.x;
            const dy = e.y - s.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            
            // Calculate edge start and end points (at the border of the nodes)
            const padding = NODE_RADIUS;
            const targetX = e.x - (dx * padding) / dist;
            const targetY = e.y - (dy * padding) / dist;
            const sourceX = s.x + (dx * padding) / dist;
            const sourceY = s.y + (dy * padding) / dist;

            ctx.beginPath();
            ctx.moveTo(sourceX, sourceY);
            ctx.lineTo(targetX, targetY);
            ctx.strokeStyle = link.color || "#94a3b8";
            ctx.lineWidth = link.weight ? link.weight : 1.5;
            if (link.style === "dashed") ctx.setLineDash([5, 5]);
            else ctx.setLineDash([]);
            ctx.stroke();

            // Draw Arrowhead
            ctx.setLineDash([]);
            const arrowSize = 6 + (link.weight || 0);
            const angle = Math.atan2(dy, dx);
            ctx.beginPath();
            ctx.moveTo(targetX, targetY);
            ctx.lineTo(targetX - arrowSize * Math.cos(angle - Math.PI / 6), targetY - arrowSize * Math.sin(angle - Math.PI / 6));
            ctx.lineTo(targetX - arrowSize * Math.cos(angle + Math.PI / 6), targetY - arrowSize * Math.sin(angle + Math.PI / 6));
            ctx.closePath();
            ctx.fillStyle = link.color || "#94a3b8";
            ctx.fill();

            // Label
            if (link.label) {
                const mx = (s.x + e.x) / 2;
                const my = (s.y + e.y) / 2;
                ctx.fillStyle = link.color || "#64748b";
                ctx.font = "10px system-ui";
                ctx.textAlign = "center";
                ctx.textBaseline = "middle";
                
                const metrics = ctx.measureText(link.label);
                ctx.fillStyle = "rgba(248, 250, 252, 0.9)";
                
                // Rounded rect background for labels
                const bgW = metrics.width + 8;
                const bgH = 14;
                ctx.beginPath();
                ctx.roundRect(mx - bgW / 2, my - bgH / 2 - 6, bgW, bgH, 4);
                ctx.fill();
                
                ctx.fillStyle = link.color || "#475569";
                ctx.fillText(link.label, mx, my - 6);
            }
        }

        ctx.setLineDash([]);

        // Nodes
        for (const node of nodesRef.current) {
            if (node.x == null || node.y == null) continue;

            const isHovered = hoveredRef.current === node.id;
            const colors = THEME_COLORS[theme][node.type] || THEME_COLORS[theme].default;

            ctx.save();
            ctx.translate(node.x, node.y);

            if (isHovered) {
                ctx.beginPath();
                ctx.arc(0, 0, NODE_RADIUS + 8, 0, Math.PI * 2);
                ctx.fillStyle = colors.fill + "30";
                ctx.fill();
            }

            // Draw different shapes based on type
            if (node.type === "company" || node.type === "bank_account") {
                // Square/Rect
                ctx.beginPath();
                ctx.roundRect(-NODE_RADIUS, -NODE_RADIUS, NODE_RADIUS * 2, NODE_RADIUS * 2, 8);
                ctx.fillStyle = colors.fill;
                ctx.fill();
                ctx.strokeStyle = colors.stroke;
                ctx.lineWidth = isHovered ? 3 : 1.5;
                ctx.stroke();
            } else if (node.type === "wallet" || node.type === "device") {
                // Hexagon
                ctx.beginPath();
                for (let i = 0; i < 6; i++) {
                    const angle = (Math.PI / 3) * i;
                    const hx = NODE_RADIUS * Math.cos(angle);
                    const hy = NODE_RADIUS * Math.sin(angle);
                    if (i === 0) ctx.moveTo(hx, hy);
                    else ctx.lineTo(hx, hy);
                }
                ctx.closePath();
                ctx.fillStyle = colors.fill;
                ctx.fill();
                ctx.strokeStyle = colors.stroke;
                ctx.lineWidth = isHovered ? 3 : 1.5;
                ctx.stroke();
            } else {
                // Default Circle
                ctx.beginPath();
                ctx.arc(0, 0, NODE_RADIUS, 0, Math.PI * 2);
                ctx.fillStyle = colors.fill;
                ctx.fill();
                ctx.strokeStyle = colors.stroke;
                ctx.lineWidth = isHovered ? 3 : 1.5;
                ctx.stroke();
            }

            // Risk indicator
            if (node.risk_score && node.risk_score > 0.8) {
                ctx.beginPath();
                ctx.arc(NODE_RADIUS * 0.7, -NODE_RADIUS * 0.7, 6, 0, Math.PI * 2);
                ctx.fillStyle = "#ef4444";
                ctx.fill();
                ctx.strokeStyle = "#fff";
                ctx.lineWidth = 1;
                ctx.stroke();
            }

            // Text
            ctx.fillStyle = "#ffffff";
            ctx.font = `bold 9px system-ui`;
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            
            const words = node.label.split(" ");
            if (words.length > 1 && words[0].length <= 10) {
                ctx.fillText(words[0], 0, -4);
                ctx.fillText(words[1].substring(0, 10), 0, 6);
            } else {
                ctx.fillText(node.label.substring(0, 10), 0, 0);
            }
            
            // Badge text (below the node)
            if (node.badge) {
                ctx.fillStyle = "#64748b";
                ctx.font = "10px system-ui";
                ctx.fillText(node.badge, 0, NODE_RADIUS + 12);
            }

            ctx.restore();
        }

        ctx.restore();
    }, [theme]);

    useEffect(() => {
        const canvas = canvasRef.current;
        const container = containerRef.current;
        if (!canvas || !container) return;

        const resize = () => {
            const rect = container.getBoundingClientRect();
            canvas.width = rect.width * window.devicePixelRatio;
            canvas.height = rect.height * window.devicePixelRatio;
            canvas.style.width = `${rect.width}px`;
            canvas.style.height = `${rect.height}px`;
            const ctx = canvas.getContext("2d");
            if (ctx) ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
            if (transformRef.current.x === 0) {
                transformRef.current.x = rect.width / 2;
                transformRef.current.y = rect.height / 2;
            }
        };
        resize();

        // Update data refs if data changes
        nodesRef.current = data.nodes.map((n: any) => ({ ...n }));
        linksRef.current = data.edges.map((e: any) => ({ ...e }));

        const sim = forceSimulation<NetworkNode>(nodesRef.current)
            .force("link", forceLink<NetworkNode, NetworkLink>(linksRef.current).id((d) => d.id).distance(150))
            .force("charge", forceManyBody().strength(-800))
            .force("center", forceCenter(0, 0))
            .force("collide", forceCollide(NODE_RADIUS + 30))
            .alphaDecay(0.05);

        // Pre-tick heavily so it appears settled
        for (let i = 0; i < 300; ++i) sim.tick();
        sim.on("tick", render);

        const ro = new ResizeObserver(() => { resize(); render(); });
        ro.observe(container);

        return () => { sim.stop(); ro.disconnect(); };
    }, [data, render]);

    const handleMouseMove = (e: React.MouseEvent) => {
        const rect = canvasRef.current?.getBoundingClientRect();
        if (!rect) return;
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const node = hitTest(x, y);

        if (canvasRef.current) {
            canvasRef.current.style.cursor = node ? "pointer" : "default";
        }

        if (node?.id !== hoveredRef.current) {
            hoveredRef.current = node?.id || null;
            setHoveredNode(node?.id || null);
            render();
        }
    };

    const handleClick = (e: React.MouseEvent) => {
        const rect = canvasRef.current?.getBoundingClientRect();
        if (!rect) return;
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const node = hitTest(x, y);
        if (node) {
            onNodeClick(node.id);
        }
    };

    return (
        <div ref={containerRef} className="absolute inset-0 w-full h-full bg-surface-50/50">
            <canvas
                ref={canvasRef}
                onMouseMove={handleMouseMove}
                onClick={handleClick}
                className="w-full h-full outline-none"
            />
        </div>
    );
}
