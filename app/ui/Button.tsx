type ButtonProps = {
  text: string;
  fn: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

const Button = ({ text, fn }: ButtonProps) => {
  return (
    <button
      onClick={fn}
      className="w-fit text-center border-2 border-borderColor px-6 py-1 rounded-xl bg-borderColor text-sm text-titleText font-600
       cursor-pointer hover:scale-[1.15] hover:bg-backgroundSecondary hover:text-borderColor hover:border-backgroundSecondary transition-all duration-300"
    >
      {text}
    </button>
  );
};

export default Button;
