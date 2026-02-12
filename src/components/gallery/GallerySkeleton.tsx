export function GallerySkeleton() {
  return (
    <div className="w-full space-y-8 animate-pulse">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 md:gap-10">
        {[...Array(3)].map((_, colIdx) => (
          <div key={colIdx} className="flex flex-col gap-6 sm:gap-8 md:gap-10">
            {[...Array(2)].map((_, i) => (
              <div
                key={i}
                className="w-full bg-muted/40 rounded-xl"
                style={{
                  aspectRatio: i === 0 ? '0.8' : '1.2',
                  height: 'auto'
                }}
              />
            ))}
          </div>
        ))}
      </div>
      <div className="flex justify-center items-center gap-3 pt-4">
        <div className="w-4 h-4 rounded-full border-2 border-muted border-t-foreground animate-spin" />
        <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Curating Exhibition...</p>
      </div>
    </div>
  );
}
