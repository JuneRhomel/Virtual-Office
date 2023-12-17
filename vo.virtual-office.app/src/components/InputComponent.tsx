export default function InputComponent({
  id,
  placeholder,
  required,
  type,
  value,
  name,
  label
}: {
  id?: string,
  placeholder?: string,
  required?: boolean,
  type?: string,
  value?: string,
  name?: string
  label?: string
}) {
  return (
    <div className="mb-1">

      <div className="input-box">
        <input
          type={type}
          name={name}
          id={id}
          placeholder={placeholder}
          required={required}
          value={value}
        />
        <label htmlFor={id}>{label}</label>
      </div>
    </div>
  );
}