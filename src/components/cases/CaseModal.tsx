import { useState } from "react";

import type { Case } from "../../services/cases";
import Modal from "../ui/Modal";
import Button from "../ui/Button";

interface CaseModalProps {
    /** If provided, we are editing an existing case. Otherwise creating. */
    existingCase?: Case;
    onSubmit: (name: string) => Promise<void>;
    onClose: () => void;
}

export default function CaseModal({
    existingCase,
    onSubmit,
    onClose,
}: CaseModalProps) {
    const [name, setName] = useState(existingCase?.name ?? "");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const isEdit = !!existingCase;

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        const trimmed = name.trim();
        if (!trimmed) return;

        setIsSubmitting(true);
        setError(null);

        try {
            await onSubmit(trimmed);
            onClose();
        } catch (err) {
            setError(
                err instanceof Error ? err.message : "Something went wrong"
            );
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <Modal
            title={isEdit ? "Edit Case" : "New Case"}
            onClose={onClose}
        >
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label
                        htmlFor="case-name"
                        className="mb-1.5 block text-sm text-zinc-400"
                    >
                        Case name
                    </label>

                    <input
                        id="case-name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Financial Fraud Investigation"
                        autoFocus
                        className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm text-white placeholder-zinc-600 outline-none focus:border-zinc-500"
                    />
                </div>

                {error && (
                    <p className="text-sm text-red-400">{error}</p>
                )}

                <div className="flex justify-end gap-2 pt-1">
                    <Button
                        variant="ghost"
                        size="sm"
                        type="button"
                        onClick={onClose}
                        disabled={isSubmitting}
                    >
                        Cancel
                    </Button>

                    <Button
                        variant="primary"
                        size="sm"
                        type="submit"
                        disabled={isSubmitting || !name.trim()}
                    >
                        {isSubmitting
                            ? isEdit
                                ? "Saving…"
                                : "Creating…"
                            : isEdit
                              ? "Save"
                              : "Create"}
                    </Button>
                </div>
            </form>
        </Modal>
    );
}
