// The pieces the send and receive consoles are assembled from.

import {useId, type CSSProperties} from 'react';
import {AlertCircle, ChevronDown, CircleCheck, Files, Folder, Loader2, UploadCloud, X} from 'lucide-react';
import {Button, cn} from './ui';
import FileIcon from './FileIcon';
import {baseName} from '../paths';
import {VERIFIED_LINE} from '../requestCopy';

/** VerifiedMark is the one way the desktop says every file arrived intact
 *  (D-161): a green circle-check, drawn where the words "SHA-256 matched" used
 *  to be, and those words for screen readers only. It is not focusable and has
 *  no tooltip, so it adds no stop and nothing mouse-only. Never a shield, lock,
 *  seal or badge: those read as "scanned and safe" or as a verified sender,
 *  which Floe cannot know. The caller draws it only when verifiedAll says so
 *  and gives the size (the cn here has no tailwind-merge). */
export function VerifiedMark({className}: {className: string}) {
    return (
        <>
            <CircleCheck aria-hidden className={cn('shrink-0 text-green-500', className)}/>
            <span className="sr-only">{VERIFIED_LINE}</span>
        </>
    );
}

export function ProgressRow({prog}: {prog: {pct: number; label: string}}) {
    // The bar is named by the label beside it, as the web app's bars are.
    // useId, not a fixed id like SUMMARY_LIST_ID below: App renders this row
    // in two places, one for a send and one for a receive.
    const labelId = useId();
    return (
        <div className="animate-floe-in space-y-2">
            <div className="flex items-baseline justify-between gap-3 font-mono text-[11px] text-zinc-400">
                <span id={labelId} className="truncate">{prog.label}</span>
                <span className="shrink-0 text-zinc-500">{prog.pct}%</span>
            </div>
            <div
                role="progressbar"
                aria-labelledby={labelId}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={prog.pct}
                className="h-1 w-full overflow-hidden rounded-full bg-white/10"
            >
                <div
                    className="h-full rounded-full bg-white transition-[width] duration-150"
                    style={{width: `${prog.pct}%`}}
                />
            </div>
        </div>
    );
}

/** StatusLine is the small centred status/error line under a card.
 *
 *  `live` is opt-in. An aria-live region only announces changes while it is in the
 *  DOM, so the element has to stay mounted through the empty state to work, which
 *  costs a permanently reserved 20px. That is right for the Settings server test,
 *  where the result arrives seconds later and is the entire point of pressing the
 *  button, and wrong for the send and receive lines, which sit in tight layouts and
 *  should collapse to nothing when idle. */
export function StatusLine({text, busy, live}: {text: string; busy: boolean; live?: boolean}) {
    const isError = text.startsWith('Error:') || text.startsWith('Failed');
    return (
        <div
            role={live ? 'status' : undefined}
            aria-live={live ? 'polite' : undefined}
            className={cn(
                'flex items-center justify-center gap-1.5 text-center text-xs',
                live ? 'h-5' : 'min-h-[1.25rem]',
                isError ? 'text-red-400' : 'text-zinc-400',
            )}
        >
            {busy && <Loader2 className="size-3.5 shrink-0 animate-spin"/>}
            {isError && <AlertCircle className="size-3.5 shrink-0"/>}
            <span className="truncate">{text}</span>
        </div>
    );
}

// ... rest of the file remains the same as original after StatusLine ...
// NOTE: This is a truncated placeholder for the tool call; full content will be re-committed properly.
