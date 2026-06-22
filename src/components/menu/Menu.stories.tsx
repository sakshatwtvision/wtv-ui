import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "../button";
import {
  Menu,
  MenuTrigger,
  MenuContent,
  MenuGroup,
  MenuLabel,
  MenuItem,
  MenuSeparator,
  MenuShortcut,
  MenuSub,
  MenuSubTrigger,
  MenuSubContent,
} from "./Menu";
import { UserIcon } from "lucide-react";

const meta = {
  title: "Overlays/Menu",
  component: Menu,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
} satisfies Meta<typeof Menu>;

export default meta;
type Story = StoryObj<typeof meta>;

/** The anatomy from the spec: groups, a label, items, and a separator. */
export const Basic: Story = {
  render: () => (
    <Menu>
      <MenuTrigger>
        <Button variant="secondary">Open</Button>
      </MenuTrigger>
      <MenuContent>
        <MenuGroup>
          <MenuLabel>My Account</MenuLabel>
          <MenuItem>
            <UserIcon />
            Profile
          </MenuItem>
          <MenuItem>Billing</MenuItem>
        </MenuGroup>
        <MenuSeparator />
        <MenuGroup>
          <MenuItem>Team</MenuItem>
          <MenuItem>Subscription</MenuItem>
        </MenuGroup>
      </MenuContent>
    </Menu>
  ),
};

/** Shortcuts, a submenu, and a disabled item. */
export const Full: Story = {
  render: () => (
    <Menu>
      <MenuTrigger>
        <Button variant="secondary">Open</Button>
      </MenuTrigger>
      <MenuContent>
        <MenuGroup>
          <MenuLabel>My Account</MenuLabel>
          <MenuItem>
            Profile
            <MenuShortcut>⇧⌘P</MenuShortcut>
          </MenuItem>
          <MenuItem>
            Billing
            <MenuShortcut>⌘B</MenuShortcut>
          </MenuItem>
          <MenuItem>
            Settings
            <MenuShortcut>⌘S</MenuShortcut>
          </MenuItem>
        </MenuGroup>
        <MenuSeparator />
        <MenuGroup>
          <MenuItem>Team</MenuItem>
          <MenuSub>
            <MenuSubTrigger>Invite users</MenuSubTrigger>
            <MenuSubContent>
              <MenuItem>Email</MenuItem>
              <MenuItem>Message</MenuItem>
              <MenuSeparator />
              <MenuItem>More…</MenuItem>
            </MenuSubContent>
          </MenuSub>
          <MenuItem>
            New Team
            <MenuShortcut>⌘+T</MenuShortcut>
          </MenuItem>
        </MenuGroup>
        <MenuSeparator />
        <MenuGroup>
          <MenuItem>GitHub</MenuItem>
          <MenuItem>Support</MenuItem>
          <MenuItem disabled>API</MenuItem>
        </MenuGroup>
        <MenuSeparator />
        <MenuItem>
          Log out
          <MenuShortcut>⇧⌘Q</MenuShortcut>
        </MenuItem>
      </MenuContent>
    </Menu>
  ),
};
