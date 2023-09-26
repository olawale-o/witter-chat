import { useMutation, useQueryClient } from "@tanstack/react-query";

const useUserMutation = () => {
  const queryClient = useQueryClient();
  
  useMutation({
    mutationFn: () => {},
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['todos'] })  
  })
};

export { useUserMutation };
