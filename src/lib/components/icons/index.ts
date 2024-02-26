import AlertTriangle from "lucide-svelte/icons/alert-triangle";
import ArrowRight from "lucide-svelte/icons/arrow-right";
import Check from "lucide-svelte/icons/check";
import ChevronLeft from "lucide-svelte/icons/chevron-left";
import ChevronRight from "lucide-svelte/icons/chevron-right";
import ClipboardCheck from "lucide-svelte/icons/clipboard-check";
import Copy from "lucide-svelte/icons/copy";
import CreditCard from "lucide-svelte/icons/credit-card";
import File from "lucide-svelte/icons/file";
import FileText from "lucide-svelte/icons/file-text";
import HelpCircle from "lucide-svelte/icons/help-circle";
import Image from "lucide-svelte/icons/image";
import Laptop from "lucide-svelte/icons/laptop";
import Loader2 from "lucide-svelte/icons/loader-2";
import Moon from "lucide-svelte/icons/moon";
import MoreVertical from "lucide-svelte/icons/more-vertical";
import Pizza from "lucide-svelte/icons/pizza";
import Plus from "lucide-svelte/icons/plus";
import Settings from "lucide-svelte/icons/settings";
import SunMedium from "lucide-svelte/icons/sun-medium";
import Trash from "lucide-svelte/icons/trash";
import User from "lucide-svelte/icons/user";
import X from "lucide-svelte/icons/x";

import Google from "./google.svelte";
import type { SvelteComponent } from "svelte";
import Apple from "./apple.svelte";

export type Icon = SvelteComponent;

export const Icons = {
	close: X,
	spinner: Loader2,
	chevronLeft: ChevronLeft,
	chevronRight: ChevronRight,
	trash: Trash,
	post: FileText,
	page: File,
	media: Image,
	settings: Settings,
	billing: CreditCard,
	ellipsis: MoreVertical,
	add: Plus,
	warning: AlertTriangle,
	user: User,
	arrowRight: ArrowRight,
	help: HelpCircle,
	pizza: Pizza,
	check: Check,
	copy: Copy,
	copyDone: ClipboardCheck,
	sun: SunMedium,
	moon: Moon,
	laptop: Laptop,
	google: Google,
	apple: Apple
};