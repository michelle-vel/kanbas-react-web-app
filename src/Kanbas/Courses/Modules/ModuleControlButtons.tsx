import { IoEllipsisVertical } from "react-icons/io5";
import GreenCheckmark from "./GreenCheckmark";
import 'bootstrap-icons/font/bootstrap-icons.css';
import { BsGripVertical } from "react-icons/bs";


export default function ModuleControlButtons() {
    return (
    <div className="float-end">
          <GreenCheckmark />
          <i className="bi bi-plus mx-2"></i>
        <IoEllipsisVertical className="fs-4" />
    </div>
    );
  }
  