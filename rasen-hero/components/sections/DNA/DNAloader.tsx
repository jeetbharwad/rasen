interface DNALoaderProps {
  size?: number | string; // e.g., 100, "100px", "2rem", etc.
  width?: number | string;
  height?: number | string;
  className?: string;
}

export default function DNALoader({
  size = 100,
  width,
  height,
  className = "",
}: DNALoaderProps) {
  // Use specific width/height if provided, otherwise default to size
  const finalWidth = width ?? size;
  const finalHeight = height ?? size;

  return (
    <div
      className={`dna-loader relative inline-block ${className}`}
      style={{ width: finalWidth, height: finalHeight }}
    >
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 100 100"
        className="block w-full h-full"
      >
        <defs>
          <mask id="clipping">
            <polygon points="0,0 100,0 100,100 0,100" fill="black" />
            <polygon points="25,25 75,25 50,75" fill="white" />
            <polygon points="50,25 75,75 25,75" fill="white" />
            <polygon points="35,35 65,35 50,65" fill="white" />
            <polygon points="35,35 65,35 50,65" fill="white" />
            <polygon points="35,35 65,35 50,65" fill="white" />
            <polygon points="35,35 65,35 50,65" fill="white" />
          </mask>
        </defs>
      </svg>

      <div className="dna-loader-box w-full h-full" />
    </div>
  );
}