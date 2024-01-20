import { Clipboard } from "lucide-react";
import { Button } from "./ui/button";
interface CodeProps {
  code: string;
  bluredCode: boolean;
}

export const ClipboardBtn = ({ code, bluredCode }: CodeProps) => {
  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(code);
  };

  return (
    <Button
      variant={"outline"}
      className={
        bluredCode
          ? "hidden"
          : "absolute top-1 right-0 cursor-pointer p-1 m-1 h-6"
      }
      onClick={handleCopyToClipboard}
    >
      <Clipboard size={18} />
    </Button>
  );
};
