import * as React from "react";
import {
  ArrowRightIcon,
  ClockIcon,
  HeartIcon,
  MessageCircleIcon,
  MoreHorizontalIcon,
  SendIcon,
} from "lucide-react";
import { Badge } from "../../components/badge";
import { Separator } from "../../components/separator";
import { TextInput } from "../../components/text-input";
import { cn } from "../../utils/cn";

// ─── Types ───────────────────────────────────────────────────────────────────

export type PostCardUser = {
  name: string;
  avatarUrl?: string;
};

export type PostCardProps = {
  title: string;
  points?: number;
  date: string;
  fromUser: PostCardUser;
  toUser: PostCardUser;
  body: React.ReactNode;
  closingLine?: string;
  tags?: string[];
  reactionCount?: number;
  commentCount?: number;
  isReacted?: boolean;
  onReact?: () => void;
  onCommentSubmit?: (comment: string) => void;
  currentUser?: PostCardUser;
  className?: string;
};

// ─── Private: Avatar ─────────────────────────────────────────────────────────

function UserAvatar({
  user,
  size,
}: {
  user: PostCardUser;
  size: "sm" | "md" | "lg";
}) {
  const initials = user.name
    .split(" ")
    .filter(Boolean)
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const sizeClass = {
    sm: "size-7 text-small",
    md: "size-10 text-medium",
    lg: "size-14 text-large",
  }[size];

  return user.avatarUrl ? (
    <img
      src={user.avatarUrl}
      alt={user.name}
      className={cn(
        "shrink-0 rounded-full object-cover ring-2 ring-white dark:ring-gray-800",
        sizeClass,
      )}
    />
  ) : (
    <div
      aria-label={user.name}
      className={cn(
        "flex shrink-0 items-center justify-center rounded-full font-medium",
        "bg-primary-100 text-primary-700 ring-2 ring-white",
        "dark:bg-primary-950 dark:text-primary-300 dark:ring-gray-800",
        sizeClass,
      )}
    >
      {initials}
    </div>
  );
}

// ─── Public export ────────────────────────────────────────────────────────────

export function PostCard({
  title,
  points,
  date,
  fromUser,
  toUser,
  body,
  closingLine,
  tags,
  reactionCount = 0,
  commentCount = 0,
  isReacted = false,
  onReact,
  onCommentSubmit,
  currentUser,
  className,
}: PostCardProps) {
  const [comment, setComment] = React.useState("");

  const handleSend = () => {
    if (!comment.trim()) return;
    onCommentSubmit?.(comment.trim());
    setComment("");
  };

  return (
    <div
      className={cn(
        "overflow-hidden rounded-large bg-white shadow-default dark:bg-gray-800",
        className,
      )}
    >
      {/* ── Header ── */}
      <div className="flex items-start gap-medium p-large pb-medium">
        <UserAvatar user={toUser} size="lg" />

        <div className="flex min-w-0 flex-1 flex-col gap-x-small">
          {/* Title + points badge */}
          <div className="flex flex-wrap items-center gap-small">
            <h3 className="text-large font-semibold text-gray-900 dark:text-white">
              {title}
            </h3>
            {points !== undefined && (
              <Badge color="yellow" variant="default" size="small">
                ⭐ {points.toLocaleString()}
              </Badge>
            )}
          </div>

          {/* From → To */}
          <div className="flex flex-wrap items-center gap-x-small text-medium text-gray-600 dark:text-gray-300">
            <UserAvatar user={fromUser} size="sm" />
            <span className="font-medium">{fromUser.name}</span>
            <ArrowRightIcon
              className="size-3.5 shrink-0 text-gray-400 dark:text-gray-500"
              aria-hidden
            />
            <UserAvatar user={toUser} size="sm" />
            <span className="font-medium">{toUser.name}</span>
          </div>
        </div>

        {/* Date + actions */}
        <div className="flex shrink-0 items-center gap-x-small">
          <div className="flex items-center gap-x-small text-small text-gray-500 dark:text-gray-500">
            <ClockIcon className="size-3.5 shrink-0" aria-hidden />
            <span>{date}</span>
          </div>
          <button
            type="button"
            aria-label="More options"
            className={cn(
              "flex size-8 items-center justify-center rounded-medium",
              "text-gray-400 transition-colors",
              "hover:bg-gray-100 hover:text-gray-600",
              "dark:text-gray-500 dark:hover:bg-gray-700 dark:hover:text-gray-300",
            )}
          >
            <MoreHorizontalIcon className="size-4" aria-hidden />
          </button>
        </div>
      </div>

      <Separator />

      {/* ── Body ── */}
      <div className="space-y-medium px-large py-medium">
        {typeof body === "string" ? (
          <p className="text-medium leading-relaxed text-gray-700 dark:text-gray-300">
            {body}
          </p>
        ) : (
          <div className="text-medium leading-relaxed text-gray-700 dark:text-gray-300">
            {body}
          </div>
        )}

        {closingLine && (
          <p className="font-semibold text-gray-800 dark:text-gray-100">
            {closingLine}
          </p>
        )}
      </div>

      {/* ── Tags ── */}
      {tags && tags.length > 0 && (
        <div className="flex flex-wrap gap-x-small px-large pb-medium">
          {tags.map((tag) => (
            <Badge key={tag} color="blue" variant="default" size="small">
              {tag}
            </Badge>
          ))}
        </div>
      )}

      {/* ── Engagement row ── (no separator above — padding separates from body) */}
      <div className="flex items-center gap-medium px-large py-medium">
        <button
          type="button"
          onClick={onReact}
          aria-label={`${reactionCount} ${reactionCount === 1 ? "reaction" : "reactions"}. Click to react.`}
          aria-pressed={isReacted}
          className={cn(
            "flex items-center gap-x-small rounded-medium text-medium transition-colors",
            isReacted
              ? "text-red-600 dark:text-red-400"
              : "text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400",
          )}
        >
          <HeartIcon
            className={cn("size-5 transition-all", isReacted && "fill-current")}
            aria-hidden
          />
          <span>
            {reactionCount} {reactionCount === 1 ? "reaction" : "reactions"}
          </span>
        </button>

        <button
          type="button"
          aria-label={`${commentCount} ${commentCount === 1 ? "comment" : "comments"}`}
          className="flex items-center gap-x-small rounded-medium text-medium text-primary-600 transition-colors hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
        >
          <MessageCircleIcon className="size-5" aria-hidden />
          <span>
            {commentCount} {commentCount === 1 ? "comment" : "comments"}
          </span>
        </button>
      </div>

      <Separator />

      {/* ── Comment input ── */}
      <div className="flex items-center gap-small px-large pb-large pt-medium">
        {currentUser && <UserAvatar user={currentUser} size="sm" />}
        <TextInput
          value={comment}
          onChange={(e) => setComment((e.target as HTMLInputElement).value)}
          placeholder="Add a comment…"
          aria-label="Add a comment"
          size="medium"
          className="flex-1"
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          }}
        />
        <button
          type="button"
          onClick={handleSend}
          aria-label="Send comment"
          disabled={!comment.trim()}
          className={cn(
            "flex size-9 shrink-0 items-center justify-center rounded-medium",
            "text-primary-600 transition-colors",
            "hover:bg-primary-50 hover:text-primary-700",
            "dark:text-primary-400 dark:hover:bg-primary-950 dark:hover:text-primary-300",
            "disabled:cursor-not-allowed disabled:opacity-40",
          )}
        >
          <SendIcon className="size-4" aria-hidden />
        </button>
      </div>
    </div>
  );
}
