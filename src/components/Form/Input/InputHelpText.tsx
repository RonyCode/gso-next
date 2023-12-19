interface InputLabelProps {
  text?: string
}

const InputHelpText = ({ text }: InputLabelProps) => {
  let hasError = false
  if (text) hasError = text.length > 0

  return (
    <>
      <div className="mb-2 mt-1 text-sm text-red-600">
        {hasError && <p> {text}</p>}
      </div>
    </>
  )
}
export default InputHelpText
