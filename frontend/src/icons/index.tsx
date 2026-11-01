import React from 'react';
import { MorphIcon, MorphIconProps } from 'morphicons/react';
import * as icons from 'lucide';

export interface IconProps extends Omit<MorphIconProps, 'icon'> {
  className?: string;
  size?: number | string;
  color?: string;
  strokeWidth?: number | string;
}

export type MorphIconComponent = React.FC<IconProps>;

const createIcon = (data: any): MorphIconComponent => {
  const Component: MorphIconComponent = (props: IconProps) => {
    return <MorphIcon icon={data} spring="snappy" {...props} />;
  };
  return Component;
};

// Re-export the core MorphIcon component and raw icons for dynamic morphing
export { MorphIcon };
export { icons as rawIcons };

// 68 Icons powered by morphicons engine
export const AlertCircle = createIcon(icons.AlertCircle);
export const AlignCenter = createIcon(icons.AlignCenter);
export const AlignJustify = createIcon(icons.AlignJustify);
export const AlignLeft = createIcon(icons.AlignLeft);
export const AlignRight = createIcon(icons.AlignRight);
export const ArrowDown = createIcon(icons.ArrowDown);
export const ArrowLeft = createIcon(icons.ArrowLeft);
export const ArrowRight = createIcon(icons.ArrowRight);
export const ArrowUp = createIcon(icons.ArrowUp);
export const Bold = createIcon(icons.Bold);
export const BookmarkCheck = createIcon(icons.BookmarkCheck);
export const Briefcase = createIcon(icons.Briefcase);
export const Building2 = createIcon(icons.Building2);
export const Calendar = createIcon(icons.Calendar);
export const CheckCircle = createIcon(icons.CheckCircle);
export const CheckCircle2 = createIcon(icons.CheckCircle2);
export const ChevronDown = createIcon(icons.ChevronDown);
export const ChevronLeft = createIcon(icons.ChevronLeft);
export const ChevronRight = createIcon(icons.ChevronRight);
export const Clock = createIcon(icons.Clock);
export const Code2 = createIcon(icons.Code2);
export const Columns = createIcon(icons.Columns);
export const Copy = createIcon(icons.Copy);
export const Cpu = createIcon(icons.Cpu);
export const Database = createIcon(icons.Database);
export const Download = createIcon(icons.Download);
export const Edit3 = createIcon(icons.Edit3);
export const ExternalLink = createIcon(icons.ExternalLink);
export const Eye = createIcon(icons.Eye);
export const EyeOff = createIcon(icons.EyeOff);
export const FileCheck2 = createIcon(icons.FileCheck2);
export const FileCode2 = createIcon(icons.FileCode2);
export const FileDown = createIcon(icons.FileDown);
export const FileSpreadsheet = createIcon(icons.FileSpreadsheet);
export const FileText = createIcon(icons.FileText);
export const Filter = createIcon(icons.Filter);
export const FolderOpen = createIcon(icons.FolderOpen);
export const Globe = createIcon(icons.Globe);
export const Grid = createIcon(icons.Grid);
export const Heading1 = createIcon(icons.Heading1);
export const Heading2 = createIcon(icons.Heading2);
export const Info = createIcon(icons.Info);
export const Image = createIcon(icons.Image);
export const Italic = createIcon(icons.Italic);
export const Key = createIcon(icons.Key);
export const Layers = createIcon(icons.Layers);
export const Layout = createIcon(icons.Layout);
export const List = createIcon(icons.List);
export const ListOrdered = createIcon(icons.ListOrdered);
export const Lock = createIcon(icons.Lock);
export const LogIn = createIcon(icons.LogIn);
export const LogOut = createIcon(icons.LogOut);
export const Mail = createIcon(icons.Mail);
export const Maximize2 = createIcon(icons.Maximize2);
export const Menu = createIcon(icons.Menu);
export const MessageSquare = createIcon(icons.MessageSquare);
export const Milestone = createIcon(icons.Milestone);
export const Minimize2 = createIcon(icons.Minimize2);
export const MonitorPlay = createIcon(icons.MonitorPlay);
export const Moon = createIcon(icons.Moon);
export const Palette = createIcon(icons.Palette);
export const Play = createIcon(icons.Play);
export const Plus = createIcon(icons.Plus);
export const Presentation = createIcon(icons.Presentation);
export const Printer = createIcon(icons.Printer);
export const Quote = createIcon(icons.Quote);
export const RefreshCw = createIcon(icons.RefreshCw);
export const RotateCcw = createIcon(icons.RotateCcw);
export const Save = createIcon(icons.Save);
export const Search = createIcon(icons.Search);
export const Server = createIcon(icons.Server);
export const ShieldAlert = createIcon(icons.ShieldAlert);
export const ShieldCheck = createIcon(icons.ShieldCheck);
export const SlidersHorizontal = createIcon(icons.SlidersHorizontal);
export const Sparkles = createIcon(icons.Sparkles);
export const Star = createIcon(icons.Star);
export const Strikethrough = createIcon(icons.Strikethrough);
export const Sun = createIcon(icons.Sun);
export const Table = createIcon(icons.Table);
export const TableIcon = createIcon(icons.Table);
export const Trash2 = createIcon(icons.Trash2);
export const TrendingUp = createIcon(icons.TrendingUp);
export const Type = createIcon(icons.Type);
export const Underline = createIcon(icons.Underline);
export const User = createIcon(icons.User);
export const Users = createIcon(icons.Users);
export const X = createIcon(icons.X);
export const Zap = createIcon(icons.Zap);
export const Check = createIcon(icons.Check);

