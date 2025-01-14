import axios from "axios";
import { BackendURL } from "../components/untile";
import { useNavigate } from "react-router-dom";
import plan_card from "./reusable_component/plan_card";

const Plan = () => {
  const [state, setState] = useState();
  const check_plan = () => {};
  return (
    <div className="max-w-full h-[100vh] flex justify-around items-center text-[30px] px-96">
      <plan_card
        plan="FREE plan"
        price="0"
        count="10"
        state={false}
        submit={check_plan}
      />
      <plan_card
        plan="PRO plan"
        price="10"
        count="30"
        state={true}
        submit={check_plan}
      />
    </div>
  );
};

export default Plan;
