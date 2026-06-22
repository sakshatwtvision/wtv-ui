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
import {
  Button,
  Text,
} from "../../components";

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
    sm: "size-7 text-x-small",
    md: "size-10 text-small",
    lg: "size-14 text-base",
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
      <div className="p-small sm:p-medium">
        <div className="flex justify-between gap-small">
          <div className="flex min-w-0 gap-small sm:gap-medium">
            <UserAvatar user={fromUser} size="md" />
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                <Text size="medium" weight="semibold">
                  {title}
                </Text>
                {points !== undefined && (
                  <Badge color="yellow" variant="default" size="small">
                    ⭐ {points.toLocaleString()}
                  </Badge>
                )}
              </div>
              <div className="mt-1">
                <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                  <div className="flex min-w-0 items-center gap-2">
                    <UserAvatar user={fromUser} size="sm" />
                    <Text variant="muted" size="small" className="truncate">
                      {fromUser.name}
                    </Text>
                  </div>
                  <ArrowRightIcon
                    className="shrink-0 text-gray-400 dark:text-gray-400"
                    aria-hidden
                    size={16}
                  />
                  <div className="flex min-w-0 items-center gap-2">
                    <UserAvatar user={toUser} size="sm" />
                    <Text variant="muted" size="small" className="truncate">
                      {toUser.name}
                    </Text>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <button
            type="button"
            aria-label="More options"
            className="-m-1 shrink-0 self-start rounded-small p-1 text-gray-500 enabled:hover:bg-gray-100 dark:text-gray-400 dark:enabled:hover:bg-gray-700"
          >
            <MoreHorizontalIcon className="size-4" />
          </button>
        </div>
      </div>

      <Separator />

      <div className="p-small sm:p-medium space-y-small">
        <Text>{body}</Text>
        {closingLine && <Text weight="medium">{closingLine}</Text>}
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-small">
            {tags.map((item, index) => (
              <Badge color="blue" key={index}>
                {item}
              </Badge>
            ))}
          </div>
        )}
      </div>

      <Separator />

      <div className="px-small py-x-small">
        <div className="flex flex-col gap-small sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-small">
            <Button
              size={"small"}
              variant={"transparent"}
              aria-pressed={isReacted}
              onClick={onReact}
              startIcon={<HeartIcon className={cn("size-5", isReacted && "text-negative-500")} />}
            >
              {reactionCount} {reactionCount === 1 ? "reaction" : "reactions"}
            </Button>
            <Button
              size={"small"}
              variant={"transparent"}
              startIcon={<MessageCircleIcon className="size-5" />}
            >
              {commentCount} {commentCount === 1 ? "comment" : "comments"}
            </Button>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <ClockIcon className="size-3.5 shrink-0" aria-hidden />
            <Text size="small" variant="muted">
              {date}
            </Text>
          </div>
        </div>
      </div>

      <Separator />

      <div className="p-small">
        <div className="flex items-center gap-small">
          <UserAvatar user={currentUser ?? { name: "You" }} size="sm" />
          <TextInput
            aria-label="Add a comment"
            placeholder="Add a comment"
            className="min-w-0 flex-1"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <Button
            aria-label="Send comment"
            onClick={handleSend}
            startIcon={<SendIcon className="size-4" />}
            className="shrink-0"
          ></Button>
        </div>
      </div>
    </div>
  );
}
