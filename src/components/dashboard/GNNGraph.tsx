import { useRef, useEffect, useCallback, useState } from "react";
import { forceSimulation, forceLink, forceManyBody, forceCenter, forceCollide } from "d3-force";
import type { SimulationNodeDatum, SimulationLinkDatum } from "d3-force";

interface GNNNode extends SimulationNodeDatum {
    id: string;
    label: string;
    type: string;
    badge?: string;
    risk_score?: number;
}

interface GNNLink extends SimulationLinkDatum<GNNNode> {
    id: string;
    source: string | GNNNode;
    target: string | GNNNode;
    label: string;
    color: string;
    style: string;
}

interface GNNGraphProps {
    data: any;
    onNodeClick: (nodeId: string) => void;
}

const TYPE_COLORS: Record<string, { fill: string; stroke: string }> = {
    person: { fill: "#3b82f6", stroke: "#2563eb" },
    phone: { fill: "#8b5cf6", stroke: "#7c3aed" },
    default: { fill: "#94a3b8", stroke: "#64748b" }
};

const NODE_RADIUS = 24;

export default function GNNGraph({ data, onNodeClick }: GNNGraphProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const [, setHoveredNode] = useState<string | null>(null);

    const rawNodes = data.elements.nodes.map((n: any) => ({ ...n.data }));
    const rawLinks = data.elements.edges.map((e: any) => ({ ...e.data }));

    const nodesRef = useRef<GNNNode[]>(rawNodes);
    const linksRef = useRef<GNNLink[]>(rawLinks);
    
    const transformRef = useRef({ x: 0, y: 0, k: 1 });
    const hoveredRef = useRef<string | null>(null);

    const hitTest = useCallback((mx: number, my: number): GNNNode | null => {
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
            if (node.x > hw) node.x = hw;
            if (node.x < -hw) node.x = -hw;
            if (node.y > hh) node.y = hh;
            if (node.y < -hh) node.y = -hh;
        }

        // Edges
        for (const link of linksRef.current) {
            const s = link.source as GNNNode;
            const e = link.target as GNNNode;
            if (s.x == null || s.y == null || e.x == null || e.y == null) continue;

            const dx = e.x - s.x;
            const dy = e.y - s.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            
            const padding = NODE_RADIUS;
            const targetX = e.x - (dx * padding) / dist;
            const targetY = e.y - (dy * padding) / dist;
            const sourceX = s.x + (dx * padding) / dist;
            const sourceY = s.y + (dy * padding) / dist;

            ctx.beginPath();
            ctx.moveTo(sourceX, sourceY);
            ctx.lineTo(targetX, targetY);
            ctx.strokeStyle = link.color || "#94a3b8";
            ctx.lineWidth = 2;
            if (link.style === "dashed") ctx.setLineDash([5, 5]);
            else ctx.setLineDash([]);
            ctx.stroke();
            
            // Draw Arrowhead
            ctx.setLineDash([]);
            const arrowSize = 6;
            const angle = Math.atan2(dy, dx);
            ctx.beginPath();
            ctx.moveTo(targetX, targetY);
            ctx.lineTo(targetX - arrowSize * Math.cos(angle - Math.PI / 6), targetY - arrowSize * Math.sin(angle - Math.PI / 6));
            ctx.lineTo(targetX - arrowSize * Math.cos(angle + Math.PI / 6), targetY - arrowSize * Math.sin(angle + Math.PI / 6));
            ctx.closePath();
            ctx.fillStyle = link.color || "#94a3b8";
            ctx.fill();

            // Label
            const mx = (s.x + e.x) / 2;
            const my = (s.y + e.y) / 2;
            ctx.fillStyle = link.color || "#64748b";
            ctx.font = "10px system-ui";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText(link.label, mx, my - 6);
        }

        ctx.setLineDash([]);

        // Nodes
        for (const node of nodesRef.current) {
            if (node.x == null || node.y == null) continue;

            const isHovered = hoveredRef.current === node.id;
            const colors = TYPE_COLORS[node.type] || TYPE_COLORS.default;

            ctx.save();
            ctx.translate(node.x, node.y);

            if (isHovered) {
                ctx.beginPath();
                ctx.arc(0, 0, NODE_RADIUS + 6, 0, Math.PI * 2);
                ctx.fillStyle = colors.fill + "30";
                ctx.fill();
            }

            // Circle
            ctx.beginPath();
            ctx.arc(0, 0, NODE_RADIUS, 0, Math.PI * 2);
            ctx.fillStyle = colors.fill;
            ctx.fill();
            ctx.strokeStyle = colors.stroke;
            ctx.lineWidth = isHovered ? 3 : 1.5;
            ctx.stroke();

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
            ctx.fillText(node.label.substring(0, 10), 0, 0);
            
            // Badge text
            if (node.badge) {
                ctx.fillStyle = "#475569";
                ctx.font = "10px system-ui";
                ctx.fillText(node.badge, 0, NODE_RADIUS + 12);
            }

            ctx.restore();
        }

        ctx.restore();
    }, []);

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

        const sim = forceSimulation<GNNNode>(nodesRef.current)
            .force("link", forceLink<GNNNode, GNNLink>(linksRef.current).id((d) => d.id).distance(150))
            .force("charge", forceManyBody().strength(-500))
            .force("center", forceCenter(0, 0))
            .force("collide", forceCollide(NODE_RADIUS + 20));

        for (let i = 0; i < 40; ++i) sim.tick();
        sim.on("tick", render);

        const ro = new ResizeObserver(() => { resize(); render(); });
        ro.observe(container);

        return () => { sim.stop(); ro.disconnect(); };
    }, [render]);

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
        <div ref={containerRef} className="absolute inset-0 w-full h-full bg-surface-0">
            <canvas
                ref={canvasRef}
                onMouseMove={handleMouseMove}
                onClick={handleClick}
                className="w-full h-full outline-none"
            />
        </div>
    );
}
