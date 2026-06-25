"use client";

import { Button } from "@heroui/react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <Button
      isIconOnly
      variant="light"
      radius="full"
      onPress={() =>
        setTheme(theme === "dark" ? "light" : "dark")
      }
      className="border border-default-200 dark:text-white"
    >
      <motion.div
        key={theme}
        initial={{ rotate: -180, scale: 0 }}
        animate={{ rotate: 0, scale: 1 }}
        transition={{ duration: 0.35 }}
      >
        {theme === "dark" ? (
          <Sun size={18} />
        ) : (
          <Moon size={18} />
        )}
      </motion.div>
    </Button>
  );
}