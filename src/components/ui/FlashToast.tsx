import { Toast } from "@base-ui/react/toast";
import toastStyles from "./FlashToast.module.css";
import { cn } from "@/lib/utils";
import { priceColors } from "@/lib/theme";

const flashToastManager = Toast.createToastManager();
export const addFlashToast = ({
  title,
  description,
  timeout = 2000,
  type = "normal",
}: {
  title: string;
  description: string;
  timeout?: number;
  type?: "error" | "normal";
}) => {
  flashToastManager.add({
    title,
    description,
    timeout,
    type,
  });
};

type ToastProps = {} & React.ComponentProps<"div">;

export default function FlashToast({ children }: ToastProps) {
  return (
    <Toast.Provider toastManager={flashToastManager}>
      {children}
      <Toast.Portal>
        <Toast.Viewport className={toastStyles.Viewport}>
          <ToastList />
        </Toast.Viewport>
      </Toast.Portal>
    </Toast.Provider>
  );
}

function ToastList() {
  const { toasts } = Toast.useToastManager();
  return toasts.map((toast) => (
    <Toast.Root
      key={toast.id}
      toast={toast}
      swipeDirection="up"
      className={cn(toastStyles.Toast, "border rounded-md shadow-xl border-gray-300")}
    >
      <Toast.Content className={toastStyles.Content}>
        <div
          className={toastStyles.Text}
          style={{
            color: toast.type === "error" ? priceColors.down : "black",
          }}
        >
          <Toast.Title className="text-sm font-bold" />
          <Toast.Description className="text-sm" />
        </div>
      </Toast.Content>
    </Toast.Root>
  ));
}
