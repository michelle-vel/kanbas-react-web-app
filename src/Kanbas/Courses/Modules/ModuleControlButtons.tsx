import { IoEllipsisVertical } from "react-icons/io5";
import GreenCheckmark from "./GreenCheckmark";
import 'bootstrap-icons/font/bootstrap-icons.css';
import { BsGripVertical, BsPlus } from "react-icons/bs";
import { FaTrash } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";


export default function ModuleControlButtons({ moduleId, deleteModule, editModule }: {
  moduleId: string; deleteModule: (moduleId: string) => void;
  editModule: (moduleId: string) => void }) {
    return (
    <div className="float-end">
            <FaPencil onClick={() => editModule(moduleId)} className="text-primary me-3" />
            <FaTrash className="text-danger me-2 mb-1" onClick={() => deleteModule(moduleId)}/>
          <GreenCheckmark />
          <i className="bi bi-plus mx-2"></i>
        <IoEllipsisVertical className="fs-4" />
    </div>
    );
  }
  
  