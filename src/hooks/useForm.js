import { useForm as useHookForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const useForm = ({ defaultValues, schema }) => {
  const {
    register,
    handleSubmit,
    control,
    trigger,
    formState: { isSubmitting, errors }
  } = useHookForm({
    defaultValues,
    resolver: zodResolver(schema)
  });
  return { register, handleSubmit, control, isSubmitting, errors, trigger };
};

export { useForm };
