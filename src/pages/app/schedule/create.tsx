import ScheduleForm from "components/Form/ScheduleForm";
import { Wrapper } from "components/Wrapper";
import { useStyledToast } from "hooks/useStyledToast";
import { SubmitHandler } from "react-hook-form";
import { ScheduleValues } from "types";

const CreateSchedule = () => {
  const { success, error } = useStyledToast();

  const handleSubmit: SubmitHandler<ScheduleValues> = async data => {
    try {
      // await loanRequests.create(data);

      success({
        description: 'Agendamento realizado com sucesso',
      });
    } catch (err) {
      error({
        error: err,
      });
    }
  };

  return (
    <Wrapper title="Realizar novo Agendamento" titleAlign="center">
      <ScheduleForm onSubmit={handleSubmit} />
    </Wrapper>
  )
}

export default CreateSchedule;