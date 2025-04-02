import { useState } from "react";
import { Typography } from "@/components/ui/typography";
import { Win98Window } from "@/components/win98-window";
import { Win98Button } from "@/components/win98-button";
import { Win98Taskbar } from "@/components/win98-taskbar";
import { Win98DesktopIcon } from "@/components/win98-desktop-icon";
import { Win98Dialog } from "@/components/win98-dialog";
import { Win98Menu } from "@/components/win98-menu";
import {
  Computer,
  Folder,
  FileText,
  Trash2,
  Globe,
  Mail,
  Settings,
  HelpCircle,
  Info,
  Power,
  User,
  Music,
  Image,
} from "lucide-react";

export function Home() {
  // Состояния для открытых окон
  const [isWelcomeOpen, setIsWelcomeOpen] = useState(true);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isExplorerOpen, setIsExplorerOpen] = useState(false);
  const [isNotepadOpen, setIsNotepadOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogProps, setDialogProps] = useState({
    title: "Информация",
    message: "Это сообщение Windows 98",
    type: "info",
  });

  // Состояние для выбранного значка на рабочем столе
  const [selectedIcon, setSelectedIcon] = useState<string | null>(null);

  // Функция для показа диалогового окна
  const showDialog = (
    title: string,
    message: string,
    type: "info" | "warning" | "error" = "info"
  ) => {
    setDialogProps({ title, message, type });
    setIsDialogOpen(true);
  };

  // Элементы меню "Пуск"
  const startMenuItems = [
    {
      label: "Программы",
      icon: <Folder className="h-4 w-4 text-foreground" />,
      submenu: [
        {
          label: "Блокнот",
          icon: <FileText className="h-4 w-4 text-foreground" />,
          onClick: () => setIsNotepadOpen(true),
        },
        {
          label: "Проводник",
          icon: <Folder className="h-4 w-4 text-foreground" />,
          onClick: () => setIsExplorerOpen(true),
        },
        {
          label: "Музыкальный проигрыватель",
          icon: <Music className="h-4 w-4 text-foreground" />,
          onClick: () =>
            showDialog("Информация", "Музыкальный проигрыватель недоступен"),
        },
      ],
    },
    {
      label: "Документы",
      icon: <FileText className="h-4 w-4 text-foreground" />,
      onClick: () =>
        showDialog("Документы", "Папка документов пуста", "info"),
    },
    {
      label: "Настройки",
      icon: <Settings className="h-4 w-4 text-foreground" />,
      onClick: () =>
        showDialog("Настройки", "Настройки системы недоступны", "warning"),
    },
    {
      label: "Справка",
      icon: <HelpCircle className="h-4 w-4 text-foreground" />,
      onClick: () => setIsAboutOpen(true),
    },
    { separator: true },
    {
      label: "Выключение",
      icon: <Power className="h-4 w-4 text-foreground" />,
      onClick: () =>
        showDialog(
          "Выключение",
          "Вы действительно хотите выключить компьютер?",
          "warning"
        ),
    },
  ];

  // Список открытых окон для панели задач
  const openWindows = [
    ...(isWelcomeOpen
      ? [
          {
            id: "welcome",
            title: "Добро пожаловать",
            onFocus: () => {
              /* Функция фокуса */
            },
          },
        ]
      : []),
    ...(isAboutOpen
      ? [
          {
            id: "about",
            title: "О системе",
            onFocus: () => {
              /* Функция фокуса */
            },
          },
        ]
      : []),
    ...(isExplorerOpen
      ? [
          {
            id: "explorer",
            title: "Проводник",
            onFocus: () => {
              /* Функция фокуса */
            },
          },
        ]
      : []),
    ...(isNotepadOpen
      ? [
          {
            id: "notepad",
            title: "Блокнот",
            onFocus: () => {
              /* Функция фокуса */
            },
          },
        ]
      : []),
  ];

  // Иконки рабочего стола
  const desktopIcons = [
    {
      id: "my-computer",
      label: "Мой компьютер",
      icon: <Computer className="h-8 w-8 text-foreground" />,
      onClick: () => setIsExplorerOpen(true),
    },
    {
      id: "my-documents",
      label: "Мои документы",
      icon: <Folder className="h-8 w-8 text-foreground" />,
      onClick: () =>
        showDialog("Документы", "Папка документов пуста", "info"),
    },
    {
      id: "internet-explorer",
      label: "Internet Explorer",
      icon: <Globe className="h-8 w-8 text-foreground" />,
      onClick: () =>
        showDialog(
          "Internet Explorer",
          "Internet Explorer не может быть запущен",
          "error"
        ),
    },
    {
      id: "recycle-bin",
      label: "Корзина",
      icon: <Trash2 className="h-8 w-8 text-foreground" />,
      onClick: () =>
        showDialog("Корзина", "Корзина пуста", "info"),
    },
    {
      id: "notepad",
      label: "Блокнот",
      icon: <FileText className="h-8 w-8 text-foreground" />,
      onClick: () => setIsNotepadOpen(true),
    },
  ];

  return (
    <div className="relative h-screen w-full overflow-hidden bg-background p-4">
      {/* Иконки рабочего стола */}
      <div className="grid grid-cols-1 gap-4">
        {desktopIcons.map((icon) => (
          <Win98DesktopIcon
            key={icon.id}
            icon={icon.icon}
            label={icon.label}
            isSelected={selectedIcon === icon.id}
            onClick={() => {
              setSelectedIcon(icon.id);
              icon.onClick();
            }}
          />
        ))}
      </div>

      {/* Окно приветствия */}
      {isWelcomeOpen && (
        <Win98Window
          title="Добро пожаловать в Windows 98"
          defaultPosition={{ x: 100, y: 50 }}
          width="500px"
          onClose={() => setIsWelcomeOpen(false)}
        >
          <div className="flex flex-col gap-4">
            <Typography.H2>Добро пожаловать в Windows 98</Typography.H2>
            <Typography.P>
              Этот сайт представляет собой ностальгическую реплику интерфейса
              Windows 98, созданную с использованием современных веб-технологий
              React и Vite.
            </Typography.P>
            <Typography.P>
              Вы можете взаимодействовать с элементами интерфейса, открывать
              окна и использовать меню "Пуск", как в оригинальной операционной
              системе.
            </Typography.P>
            <div className="flex justify-end">
              <Win98Button onClick={() => setIsWelcomeOpen(false)}>
                Закрыть
              </Win98Button>
            </div>
          </div>
        </Win98Window>
      )}

      {/* Окно "О системе" */}
      {isAboutOpen && (
        <Win98Window
          title="О системе"
          defaultPosition={{ x: 150, y: 100 }}
          width="400px"
          onClose={() => setIsAboutOpen(false)}
        >
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <Computer className="h-16 w-16 text-foreground" />
              <div>
                <Typography.H3>Windows 98</Typography.H3>
                <Typography.P>
                  Версия 4.10.1998
                </Typography.P>
                <Typography.Small>
                  © 1981-1998 Microsoft Corporation
                </Typography.Small>
              </div>
            </div>
            <div className="border-t border-border pt-4">
              <Typography.P>
                Этот проект создан с использованием:
              </Typography.P>
              <Typography.List>
                <li>React 19</li>
                <li>Vite</li>
                <li>TypeScript</li>
                <li>Tailwind CSS</li>
              </Typography.List>
            </div>
            <div className="flex justify-end">
              <Win98Button onClick={() => setIsAboutOpen(false)}>
                OK
              </Win98Button>
            </div>
          </div>
        </Win98Window>
      )}

      {/* Окно проводника */}
      {isExplorerOpen && (
        <Win98Window
          title="Проводник"
          defaultPosition={{ x: 200, y: 150 }}
          width="600px"
          height="400px"
          onClose={() => setIsExplorerOpen(false)}
        >
          <div className="flex h-full flex-col">
            <div className="mb-4 flex gap-2">
              <Win98Button
                size="sm"
                icon={<Folder className="h-4 w-4 text-foreground" />}
              >
                Файл
              </Win98Button>
              <Win98Button
                size="sm"
                icon={<Settings className="h-4 w-4 text-foreground" />}
              >
                Правка
              </Win98Button>
              <Win98Button
                size="sm"
                icon={<HelpCircle className="h-4 w-4 text-foreground" />}
              >
                Справка
              </Win98Button>
            </div>
            <div className="flex flex-1 gap-4">
              <div className="w-1/4 border-2 border-border p-2">
                <Typography.H4>Папки</Typography.H4>
                <div className="mt-2 flex flex-col gap-1">
                  <div className="flex cursor-pointer items-center gap-1 p-1 hover:bg-primary hover:text-primary-foreground">
                    <Computer className="h-4 w-4 text-foreground" />
                    <Typography.Small>Мой компьютер</Typography.Small>
                  </div>
                  <div className="flex cursor-pointer items-center gap-1 p-1 hover:bg-primary hover:text-primary-foreground">
                    <Folder className="h-4 w-4 text-foreground" />
                    <Typography.Small>Мои документы</Typography.Small>
                  </div>
                  <div className="flex cursor-pointer items-center gap-1 p-1 hover:bg-primary hover:text-primary-foreground">
                    <Trash2 className="h-4 w-4 text-foreground" />
                    <Typography.Small>Корзина</Typography.Small>
                  </div>
                </div>
              </div>
              <div className="flex-1 border-2 border-border p-2">
                <div className="grid grid-cols-4 gap-4">
                  <Win98DesktopIcon
                    icon={<Folder className="h-8 w-8 text-foreground" />}
                    label="Программы"
                  />
                  <Win98DesktopIcon
                    icon={<FileText className="h-8 w-8 text-foreground" />}
                    label="readme.txt"
                  />
                  <Win98DesktopIcon
                    icon={<Image className="h-8 w-8 text-foreground" />}
                    label="image.bmp"
                  />
                  <Win98DesktopIcon
                    icon={<User className="h-8 w-8 text-foreground" />}
                    label="Пользователи"
                  />
                </div>
              </div>
            </div>
            <div className="mt-2 border-t-2 border-border p-1">
              <Typography.Small>
                4 объекта, 2.5 МБ свободно
              </Typography.Small>
            </div>
          </div>
        </Win98Window>
      )}

      {/* Окно блокнота */}
      {isNotepadOpen && (
        <Win98Window
          title="Блокнот - Безымянный"
          defaultPosition={{ x: 250, y: 200 }}
          width="500px"
          height="350px"
          onClose={() => setIsNotepadOpen(false)}
        >
          <div className="flex h-full flex-col">
            <div className="mb-2 flex gap-2">
              <Win98Button size="sm">Файл</Win98Button>
              <Win98Button size="sm">Правка</Win98Button>
              <Win98Button size="sm">Формат</Win98Button>
              <Win98Button size="sm">Вид</Win98Button>
              <Win98Button size="sm">Справка</Win98Button>
            </div>
            <textarea
              className="flex-1 resize-none border-2 border-border bg-white p-2 font-mono text-foreground focus:outline-none"
              placeholder="Введите текст здесь..."
            ></textarea>
          </div>
        </Win98Window>
      )}

      {/* Диалоговое окно */}
      <Win98Dialog
        title={dialogProps.title}
        message={dialogProps.message}
        type={dialogProps.type as "info" | "warning" | "error"}
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        buttons={[{ label: "OK", onClick: () => setIsDialogOpen(false) }]}
      />

      {/* Панель задач */}
      <Win98Taskbar
        startMenuItems={startMenuItems}
        openWindows={openWindows}
      />
    </div>
  );
}