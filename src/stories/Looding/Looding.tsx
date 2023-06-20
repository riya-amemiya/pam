export const Looding = ({
  borderColor = "#2D9CDB",
}: { borderColor: string }) => {
  return (
    <div className="h-full w-full">
      <div className="flex items-center justify-center h-full w-full self-center">
        <div
          className="animate-spin h-10 w-10 border-4 rounded-full border-t-transparent"
          style={{ borderColor }}
        />
      </div>
    </div>
  );
};
export default Looding;
