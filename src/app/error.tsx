"use client";

import ErrorPageLayout from "@/components/ErrorPageLayout";

type ErrorPageProps = {
  reset: () => void;
};

export default function Error({ reset }: ErrorPageProps) {
  return (
    <ErrorPageLayout
      badge="500 / Server Error"
      heading="Something went wrong on our end."
      description="We're experiencing an unexpected server error. Please try refreshing or return to the homepage."
      graphicDigits={["5", "0", "0"]}
      statuses={["server error", "system issue"]}
      retry={reset}
    />
  );
}
