import { useForm as useHookForm } from "react-hook-form";


const useForm = ({ defaultValues }) => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting }
  } = useHookForm({
    defaultValues
  });
  return { register, handleSubmit, isSubmitting };
};

export { useForm };
