import { CiSearch, CiStickyNote, CiWarning } from "react-icons/ci";
import { FaHome, FaInfoCircle, FaSignOutAlt } from "react-icons/fa";
import {
  FaAlignLeft,
  FaAlignRight,
  FaAngleLeft,
  FaAngleRight,
  FaAngleUp,
  FaAnglesLeft,
  FaAnglesRight,
  FaArrowLeft,
  FaArrowRight,
  FaBan,
  FaBars,
  FaBell,
  FaBold,
  FaCheck,
  FaCircleQuestion,
  FaCode,
  FaEye,
  FaEyeSlash,
  FaItalic,
  FaPause,
  FaPlay,
  FaPlus,
  FaRegStar,
  FaStop,
  FaStrikethrough,
  FaTrash,
  FaUser,
} from "react-icons/fa6";
import { FiLogIn } from "react-icons/fi";
import { GoClock, GoGear, GoHorizontalRule, GoListOrdered, GoListUnordered } from "react-icons/go";
import { HiOutlineCalendar, HiOutlineMail, HiOutlineStatusOnline } from "react-icons/hi";
import { IoClose, IoSave } from "react-icons/io5";
import { LuHeading1, LuHeading2, LuHeading3, LuHeading4, LuHeading5, LuHeading6, LuListTodo, LuMousePointerClick, LuRotateCcw } from "react-icons/lu";
import { MdFiberNew, MdMusicNote, MdMusicOff } from "react-icons/md";
import { RiCodeBlock, RiFilePaper2Line, RiQuestionAnswerLine } from "react-icons/ri";
import { RxDashboard } from "react-icons/rx";
import { SlNotebook } from "react-icons/sl";
import { TbArrowBarToLeft, TbEdit, TbEditOff, TbPageBreak } from "react-icons/tb";

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
    edit: <TbEdit />,
    editOff: <TbEditOff />,
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
    close: <IoClose />,
    click: <LuMousePointerClick />,
    musicNote: <MdMusicNote />,
    musicNoteMuted: <MdMusicOff />,
    bell: <FaBell />,
    check: <FaCheck />
}

export default icons;