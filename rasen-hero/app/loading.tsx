import DNALoader from "@/components/sections/DNA/DNAloader";

//  (Applies to all routes automatically)
export default function UniversalLoader() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center  backdrop-blur-xl">
    <DNALoader />
    </div>
  );
}