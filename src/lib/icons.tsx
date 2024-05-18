import { CiSearch, CiStickyNote, CiWarning } from "react-icons/ci";
import { FaEdit, FaHome, FaInfoCircle, FaSignOutAlt } from "react-icons/fa";
import {
  FaBold,
  FaCode,
  FaItalic,
  FaStrikethrough,
  FaAngleLeft,
  FaAngleRight,
  FaAngleUp,
  FaAnglesLeft,
  FaAnglesRight,
  FaBars,
  FaCircleQuestion,
  FaEye,
  FaEyeSlash,
  FaTrash,
  FaUser,
  FaRegStar,
  FaBan,
  FaAlignLeft,
  FaAlignRight,
  FaPlus,
  FaArrowLeft,
  FaArrowRight,
  FaPlay,
  FaPause,
  FaStop,
} from "react-icons/fa6";
import { RiCodeBlock, RiFilePaper2Line, RiQuestionAnswerLine } from "react-icons/ri";
import { RxDashboard } from "react-icons/rx";
import { GoClock, GoGear, GoHorizontalRule, GoListOrdered, GoListUnordered } from "react-icons/go";
import { TbArrowBarToLeft, TbPageBreak } from "react-icons/tb";
import { LuHeading1, LuHeading2, LuHeading3, LuHeading4, LuHeading5, LuHeading6, LuListTodo, LuRotateCcw } from "react-icons/lu";
import { MdFiberNew } from "react-icons/md";
import { HiOutlineCalendar, HiOutlineMail, HiOutlineStatusOnline } from "react-icons/hi";
import { FiLogIn } from "react-icons/fi";
import { SlNotebook } from "react-icons/sl";
import { IoClose, IoSave } from "react-icons/io5";

const icons = {
    user: <FaUser />,
    dashboard: <RxDashboard />,
    question: <FaCircleQuestion />,
    article: <RiFilePaper2Line />,
    barArrow: <TbArrowBarToLeft />,
    infoCircle: <FaInfoCircle />,
    note: <CiStickyNote />,
    todo: <LuListTodo />,
    eye: <FaEye />,
    eyeSlash: <FaEyeSlash />,
    search: <CiSearch />,
    trash: <FaTrash />,
    edit: <FaEdit />,
    bars: <FaBars />,
    angleRight: <FaAngleRight />,
    angleLeft: <FaAngleLeft />,
    anglesRight: <FaAnglesRight />,
    anglesLeft: <FaAnglesLeft />,
    angleUp: <FaAngleUp />,
    bold: <FaBold />,
    italic: <FaItalic />,
    strikethrough: <FaStrikethrough />,
    code: <FaCode />,
    codeBlock: <RiCodeBlock />,
    horizontalRule: <GoHorizontalRule />,
    listOrdered: <GoListOrdered />,
    listUnordered: <GoListUnordered />,
    pageBreak: <TbPageBreak />,
    heading1: <LuHeading1 />,
    heading2: <LuHeading2 />,
    heading3: <LuHeading3 />,
    heading4: <LuHeading4 />,
    heading5: <LuHeading5 />,
    heading6: <LuHeading6 />,
    email: <HiOutlineMail />,
    answers: <RiQuestionAnswerLine />,
    new: <MdFiberNew />,
    warning: <CiWarning />,
    online: <HiOutlineStatusOnline />,
    star: <FaRegStar />,
    calendar: <HiOutlineCalendar />,
    ban: <FaBan />,
    login: <FiLogIn />,
    plus: <FaPlus />,
    arrowLeft: <FaArrowLeft />,
    arrowRight: <FaArrowRight />,
    gear: <GoGear />,
    alignLeft: <FaAlignLeft />,
    alignRight: <FaAlignRight />,
    logout: <FaSignOutAlt />,
    home: <FaHome />,
    diary: <SlNotebook />,
    clock: <GoClock />,
    play: <FaPlay />,
    pause: <FaPause />,
    reset: <LuRotateCcw />,
    stop: <FaStop />,
    save: <IoSave />,
    close: <IoClose />
}

export default icons;