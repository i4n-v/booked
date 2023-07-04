interface AssessmentCommom {
  number: number;
}
interface AssessmentCreate extends AssessmentCommom {
  book_id: string;
}

interface Assessment extends AssessmentCommom {
  id: string;
}

interface AssessmentUpdate extends Assessment {}

enum AssessmentTypes {
  CREATE,
  UPDATE,
}

type IAssessment<T extends keyof typeof AssessmentTypes | null = null> =
  T extends "CREATE"
    ? AssessmentCreate
    : T extends "UPDATE"
    ? AssessmentUpdate
    : Assessment;

export default IAssessment;
