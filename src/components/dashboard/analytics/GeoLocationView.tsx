import { useState } from "react";
import { mockGeoLocation } from "../../../data/mockCaseData";

export default function GeoLocationView({
    onSelect,
}: {
    onSelect?: (item: any) => void;
}) {
    const [selectedId, setSelectedId] = useState<string | null>(null);

    // Normalize coordinates to a 0-100% scale for pseudo-map
    const lats = mockGeoLocation.map((g) => g.lat);
    const lngs = mockGeoLocation.map((g) => g.lng);

    const minLat = Math.min(...lats) - 0.01;
    const maxLat = Math.max(...lats) + 0.01;
    const minLng = Math.min(...lngs) - 0.01;
    const maxLng = Math.max(...lngs) + 0.01;

    const selectedPoint = mockGeoLocation.find(
        (g) => g.id === selectedId
    );

    const handleSelect = (point: typeof mockGeoLocation[0]) => {
        setSelectedId(point.id);

        if (onSelect) {
            onSelect({
                id: point.id,
                label: point.label,
                type: point.type,
                details: {
                    entity: point.entity,
                    lat: point.lat.toFixed(4),
                    lng: point.lng.toFixed(4),
                    timestamp: new Date(point.timestamp).toLocaleString(),
                    ...(point as any).details,
                },
            });
        }
    };

    return (
        <div className="flex h-full flex-col relative bg-slate-900 rounded-xl overflow-hidden">

            {/* Satellite Map Background */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    backgroundImage: `
                        linear-gradient(
                            rgba(2, 6, 23, 0.45),
                            rgba(2, 6, 23, 0.45)
                        ),
                        url("https://imgs.search.brave.com/RJyN4NnT_sAQ-Eu4lEFD99iEF9DaLQaEhI0W2xiGH3c/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZWVrc2Zvcmdl/ZWtzLm9yZy93cC1j/b250ZW50L3VwbG9h/ZHMvMjAyMzEyMjMy/MjU3NDEvc2F0ZWxs/aXRlLXZpZXctaW4t/Z29vZ2xlLW1hcHMt/ZGVza3RvcC1waWM1/LndlYnA")
                    `,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    filter: "saturate(0.85) contrast(1.1)",
                }}
            />

            {/* Subtle map grid overlay */}
            <div
                className="absolute inset-0 opacity-10 pointer-events-none"
                style={{
                    backgroundImage:
                        "linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)",
                    backgroundSize: "40px 40px",
                }}
            />

            {/* Header / Legend */}
            <div className="absolute top-4 left-4 z-10 bg-slate-900/75 backdrop-blur-md border border-slate-600/70 p-3 rounded-lg shadow-lg">
                <h3 className="text-white font-bold text-sm tracking-wide">
                    Movement Intelligence
                </h3>

                <p className="text-slate-300 text-xs mt-1">
                    Live tracking & historical incidents
                </p>

                <div className="mt-3 flex gap-4 text-xs text-white">
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                        Residence
                    </div>

                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-red-500"></div>
                        Incident
                    </div>

                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                        Comm / Fin
                    </div>
                </div>
            </div>

            {/* Map */}
            <div className="relative flex-1">
                {mockGeoLocation.map((point) => {
                    const x =
                        ((point.lng - minLng) /
                            (maxLng - minLng)) *
                        100;

                    const y =
                        ((maxLat - point.lat) /
                            (maxLat - minLat)) *
                        100;

                    let color = "bg-slate-400";

                    if (point.type === "residence") {
                        color = "bg-blue-500";
                    }

                    if (point.type === "incident") {
                        color = "bg-red-500";
                    }

                    if (
                        point.type === "financial" ||
                        point.type === "communication"
                    ) {
                        color = "bg-yellow-500";
                    }

                    const isSelected = selectedId === point.id;

                    return (
                        <div
                            key={point.id}
                            className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
                            style={{
                                left: `${x}%`,
                                top: `${y}%`,
                            }}
                            onClick={() => handleSelect(point)}
                        >
                            {/* Ping animation for incidents */}
                            {point.type === "incident" && (
                                <div className="absolute inset-0 rounded-full bg-red-500 animate-ping opacity-75"></div>
                            )}

                            {/* Location marker */}
                            <div
                                className={`
                                    relative w-4 h-4 rounded-full
                                    border-2 border-white
                                    shadow-lg
                                    ${color}
                                    transition-transform
                                    ${isSelected
                                        ? "scale-150"
                                        : "group-hover:scale-125"
                                    }
                                `}
                            ></div>

                            {/* Selected label */}
                            {isSelected && (
                                <div className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 bg-white text-slate-900 text-xs font-bold px-2 py-1 rounded whitespace-nowrap z-20 shadow-xl">
                                    {point.label}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

            {/* Details Panel */}
            {selectedPoint && (
                <div className="absolute bottom-4 left-4 right-4 bg-slate-900/85 backdrop-blur-md border border-slate-600/70 p-4 rounded-xl shadow-2xl flex justify-between items-center text-sm z-20">
                    <div>
                        <div className="font-bold text-white text-base">
                            {selectedPoint.label}
                        </div>

                        <div className="text-slate-400 mt-1">
                            Entity:{" "}
                            <span className="text-slate-300">
                                {selectedPoint.entity}
                            </span>
                        </div>
                    </div>

                    <div className="text-right">
                        <div className="text-brand-400 font-mono">
                            {new Date(
                                selectedPoint.timestamp
                            ).toLocaleString()}
                        </div>

                        <div className="text-slate-500 mt-1 text-xs">
                            LAT: {selectedPoint.lat.toFixed(4)} | LNG:{" "}
                            {selectedPoint.lng.toFixed(4)}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}