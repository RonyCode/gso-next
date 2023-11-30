interface InputLabelProps {
  text?: string;
}

const InputHelpText = ({ text }: InputLabelProps) => {
  let hasError = false;
  if (text) hasError = text.length > 0;

  return (
    <>
      <div className="text-sm text-red-600 mt-1 mb-2">
        {hasError && <p> {text}</p>}
      </div>
    </>
  );
};
export default InputHelpText;
