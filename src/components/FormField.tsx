import { InputMask } from "@react-input/mask";

type Props = {
  type?: string;
  title: string;
  state: string;
  placeholder: string;
  isTextArea?: boolean;
  maxLength?:number | 0;
  setMask?: boolean | false;
  mask?: string;
  setState: (value: string) => void;
};

const FormField = ({
  type,
  title,
  maxLength,
  state,
  setMask,
  mask,
  placeholder,
  isTextArea,
  setState,
}: Props) => {
  return (
    <div className="flex-col">
      <label className="flex-wrap text-gray-100">{title}</label>

      {isTextArea ? (
        <textarea
          placeholder={placeholder}
          value={state}
          className="form_field-input mt-2"
          onChange={(e) => setState(e.target.value)}
        />
      ) : setMask == true ? (
        <>
          <InputMask
            type={type || "text"}
            placeholder={placeholder}
            required
            value={state}
            mask={mask}
            replacement={{ _: /./}}
            showMask separate
            className="form_field-input mb-2 mt-2"
            onChange={(e) => setState(e.target.value)}
          ></InputMask>
        </>
      ) : (
        <input
          type={type || "text"}
          placeholder={placeholder}
          pattern={type == "number" ? "\d+" : "\.*"}
          required
          value={state}
          maxLength={maxLength}
          className="form_field-input mb-2 mt-2"
          onChange={(e) => setState(e.target.value)}
        />
      )}
    </div>
  );
};

export default FormField;
