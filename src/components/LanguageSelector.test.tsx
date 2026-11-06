import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import LanguageSelector from "./LanguageSelector";

const mocks = vi.hoisted(() => ({
  changeLanguage: vi.fn(),
  setLanguagePreference: vi.fn(),
}));

vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    i18n: {
      resolvedLanguage: "en",
      changeLanguage: mocks.changeLanguage,
    },
  }),
}));

vi.mock("@/lib/storage", () => ({
  setLanguagePreference: mocks.setLanguagePreference,
}));

describe("LanguageSelector", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mocks.changeLanguage.mockResolvedValue(undefined);
  });

  it("shows the available languages and disables the active language", async () => {
    const user = userEvent.setup();
    render(
      <LanguageSelector>
        <button>Choose language</button>
      </LanguageSelector>,
    );
    await user.click(screen.getByRole("button", { name: "Choose language" }));
    expect(screen.getByRole("button", { name: "English" })).toBeDisabled();
    expect(screen.getByRole("button", { name: "简体中文" })).toBeEnabled();
  });

  it("changes and saves the selected language, then closes the menu", async () => {
    const user = userEvent.setup();
    render(
      <LanguageSelector>
        <button>Choose language</button>
      </LanguageSelector>,
    );
    await user.click(screen.getByRole("button", { name: "Choose language" }));
    await user.click(screen.getByRole("button", { name: "简体中文" }));
    expect(mocks.changeLanguage).toHaveBeenCalledWith("zh-Hans");
    await waitFor(() => {
      expect(mocks.setLanguagePreference).toHaveBeenCalledWith("zh-Hans");
      expect(screen.queryByRole("button", { name: "简体中文" })).not.toBeInTheDocument();
    });
  });
});
