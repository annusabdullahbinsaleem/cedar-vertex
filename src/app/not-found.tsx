import ErrorPageLayout from "@/components/ErrorPageLayout";

export default function NotFound() {
  return (
    <ErrorPageLayout
      badge="404 / Not Found"
      heading="Looks like this page took a wrong turn."
      description="The page you're looking for doesn't exist or may have moved."
      graphicDigits={["4", "0", "4"]}
      statuses={["missing page", "disconnected route"]}
    />
  );
}
