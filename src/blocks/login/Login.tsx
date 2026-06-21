import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import {
  Button,
  Carousel,
  Checkbox,
  Separator,
  SocialButton,
  TextInput,
  TextLink,
} from "../../components";
import { cn } from "../../utils/cn";

const HERO_IMAGE_URL =
  "https://incentiwise-d-work-demo-media.s3.amazonaws.com/login_page_banners/WhatsApp_Image_2026-06-03_at_16.51.28.jpeg";

const LOGO_URL =
  "https://wtvision.incentiwise.work/_next/static/media/ic-logo-icon.09n0msfa3uf89.webp";

/** A hero image: a bare URL, or a URL with descriptive alt text. */
type LoginImage = string | { src: string; alt?: string };

type LoginProps = {
  /**
   * Hero artwork shown on the right card. Pass a single image (URL or object)
   * for a static banner, or an array to render an auto-wrapping carousel with
   * prev/next controls and indicators.
   */
  images?: LoginImage | LoginImage[];
  /** Auto-advance the hero carousel on a timer (only applies to image arrays). */
  isAutoplayEnabled?: boolean;
};

/** Normalize the `images` prop into a consistent `{ src, alt }[]` list. */
function toImageList(
  images: NonNullable<LoginProps["images"]>,
): { src: string; alt: string }[] {
  const list = Array.isArray(images) ? images : [images];
  return list.map((image) =>
    typeof image === "string"
      ? { src: image, alt: "" }
      : { src: image.src, alt: image.alt ?? "" },
  );
}

/* Circular prev/next control, in Forma tokens. `rounded-full` now reads as a
 * true circle thanks to the `corner-shape: round` exception in style.css. */
const triggerClass = cn(
  "absolute top-1/2 -translate-y-1/2 flex items-center justify-center size-10",
  "rounded-full bg-white/80 text-gray-800 shadow-default transition-colors",
  "hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400",
);

function Login({
  images = [HERO_IMAGE_URL, HERO_IMAGE_URL, HERO_IMAGE_URL],
  isAutoplayEnabled = false,
}: LoginProps = {}) {
  const slides = toImageList(images);
  const hasCarousel = slides.length > 1;

  return (
    <div
      className={cn(
        "flex min-h-screen flex-col gap-medium p-medium md:flex-row lg:flex-row",
      )}
    >
      {/* Left: form card */}
      <div
        className={cn(
          "flex flex-col items-center justify-center",
          "flex-1 md:flex-[2] lg:flex-[2]",
          "rounded-large",
          "bg-card",
          "px-large py-2x-large md:px-x-large lg:px-x-large",
        )}
      >
        {/*
         * Five named sections. Inter-section gap is x-large (32 px) — large
         * enough to read as a break, tight enough to feel cohesive. Each
         * section controls its own internal spacing independently.
         * Sections 4 + 5 share a wrapper so the separator and social button
         * stay together (gap-medium, 16 px) instead of floating 48 px apart.
         */}
        <div className="flex w-full max-w-[380px] flex-col gap-x-large">
          {/* 1 — Logo */}
          <div className="size-10 shrink-0 overflow-hidden">
            <img
              src={LOGO_URL}
              alt="Incentiwise logo"
              className="h-full w-full object-contain"
            />
          </div>

          {/* 2 — Heading + subtitle */}
          <div className="flex flex-col gap-small">
            <h1 className="text-4x-large font-semibold leading-tight tracking-tight">
              Hello,
              <br />
              Welcome Back
            </h1>
            <p className="text-small text-gray-500 dark:text-gray-400">
              Access your Incentiwise dashboard to recognize and reward your
              team.
            </p>
          </div>

          {/* 3 — Email · Password · Remember me / Forgot password · Login */}
          <div className="flex flex-col gap-medium">
            <TextInput
              type="email"
              placeholder="stanley@gmail.com"
              aria-label="Email address"
              size="large"
            />
            <TextInput
              type="password"
              placeholder="Password"
              aria-label="Password"
              size="large"
            />
            <div className="flex items-center justify-between">
              <Checkbox>Remember me</Checkbox>
              <TextLink>Forgot password?</TextLink>
            </div>
            <Button variant="primary" size="large" isFullWidth>
              Login
            </Button>
          </div>

          {/* 4 — Separator  ·  5 — Social sign-in (tight pair) */}
          <div className="flex flex-col gap-medium">
            <Separator text="OR" />
            <SocialButton provider="google" size="large" isFullWidth>
              Continue with Google
            </SocialButton>
          </div>
        </div>
      </div>

      {/* Right: image card — hidden on mobile */}
      <div
        className={cn(
          "hidden md:block lg:block",
          "flex-[3] overflow-hidden rounded-large",
          "bg-linear-to-br from-gray-200 via-gray-300 to-gray-400",
          "dark:from-gray-800 dark:via-gray-850 dark:to-gray-900",
        )}
      >
        {hasCarousel ? (
          <Carousel.Root
            total={slides.length}
            isAutoplayEnabled={isAutoplayEnabled}
            autoplayInterval={3500}
            className="h-full w-full"
          >
            <Carousel.Viewport className="h-full w-full rounded-large">
              <Carousel.Track>
                {slides.map((image, index) => (
                  <Carousel.Slide key={index}>
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="h-full w-full object-cover object-center"
                    />
                  </Carousel.Slide>
                ))}
              </Carousel.Track>

              <Carousel.PrevTrigger className={cn(triggerClass, "left-large")}>
                <ChevronLeftIcon className="size-5" />
              </Carousel.PrevTrigger>
              <Carousel.NextTrigger className={cn(triggerClass, "right-large")}>
                <ChevronRightIcon className="size-5" />
              </Carousel.NextTrigger>

              <Carousel.Indicators className="absolute bottom-large left-1/2 flex -translate-x-1/2 items-center gap-1.5 rounded-full bg-black/45 px-small py-x-small backdrop-blur-sm">
                {({ index, isActive }) => (
                  <Carousel.Indicator
                    key={index}
                    index={index}
                    className={cn(
                      "h-1.5 rounded-full transition-all duration-300",
                      isActive
                        ? "w-6 bg-white"
                        : "w-1.5 bg-white/60 hover:bg-white/80",
                    )}
                  />
                )}
              </Carousel.Indicators>
            </Carousel.Viewport>
          </Carousel.Root>
        ) : (
          <img
            src={slides[0].src}
            alt={slides[0].alt}
            className="h-full w-full object-cover object-center"
          />
        )}
      </div>
    </div>
  );
}

export { Login };
export type { LoginProps };
