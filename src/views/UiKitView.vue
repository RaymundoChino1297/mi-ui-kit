<script setup>
import { ref } from "vue";
import { Search } from "lucide-vue-next";
import Button from "@/components/ui/Button.vue";
import Input from "@/components/ui/Input.vue";
import Switch from "@/components/ui/Switch.vue";
import Tag from "@/components/ui/Tag.vue";
import Card from "@/components/ui/Card.vue";
import ProgressBar from "@/components/ui/ProgressBar.vue";
import Select from "@/components/ui/Select.vue";
import Pagination from "@/components/ui/Pagination.vue";
import {
  TabGroup,
  TabList,
  Tab,
  TabPanel,
  TabPanels,
} from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { toast } from "@/composables/useToast";

const nombre = ref("");
const notificaciones = ref(true);
const rol = ref("dev");
const paginaDemo = ref(
  Array.from({ length: 47 }, (_, i) => ({ id: i + 1, name: `Item ${i + 1}` }))
);
</script>

<template>
  <div class="mx-auto flex w-full max-w-4xl flex-col gap-6">
    <p class="text-muted-foreground text-sm">
      Galería de componentes — inspirados en shadcn/ui (Vue 3).
    </p>

    <Card class="gap-3">
      <h2 class="text-lg font-medium">Botones y tags</h2>
      <div class="flex flex-wrap gap-2">
        <Button>Default</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="destructive">Destructive</Button>
        <Button
          variant="outline"
          @click="
            toast({ title: 'Toast', description: 'Ejemplo desde UI Kit' })
          "
        >
          Toast
        </Button>
        <Button variant="ghost"><Search /></Button>
        <Tag>Etiqueta</Tag>
        <Tag variant="success">ACTIVO</Tag>
        <Tag variant="error">INACTIVO</Tag>
      </div>
    </Card>

    <Card class="gap-4">
      <h2 class="text-lg font-medium">Formulario</h2>
      <div class="grid gap-4 sm:grid-cols-2">
        <Input v-model="nombre" label="Nombre" placeholder="Tu nombre" />
        <div class="flex items-center gap-3 pt-6">
          <Switch variant="primary" shape="square" v-model="notificaciones" />
          <Switch variant="grape" shape="circular" v-model="notificaciones" />
        </div>
      </div>
      <Select v-model="rol" label="Rol">
        <template #select>
          {{
            rol === "dev"
              ? "Desarrollador"
              : rol === "design"
                ? "Diseño"
                : "Selecciona…"
          }}
        </template>
        <template #options="{ selectOption }">
          <button
            type="button"
            class="hover:bg-accent w-full rounded px-3 py-2 text-left text-sm"
            @click="selectOption('dev')"
          >
            Desarrollador
          </button>
          <button
            type="button"
            class="hover:bg-accent w-full rounded px-3 py-2 text-left text-sm"
            @click="selectOption('design')"
          >
            Diseño
          </button>
        </template>
      </Select>
    </Card>

    <Card class="gap-3">
      <h2 class="text-lg font-medium">Progreso y tooltip</h2>
      <ProgressBar :progress="65" :max="100" color="green" />
      <Tooltip>
        <TooltipTrigger>
          <Button variant="outline" size="sm">Hover para tooltip</Button>
        </TooltipTrigger>
        <TooltipContent side="bottom">Texto de ayuda</TooltipContent>
      </Tooltip>
    </Card>

    <Card class="gap-3">
      <h2 class="text-lg font-medium">Tabs</h2>
      <TabGroup>
        <TabList>
          <Tab>General</Tab>
          <Tab>Cuenta</Tab>
        </TabList>
        <TabPanels>
          <TabPanel class="text-muted-foreground pt-3 text-sm">
            Contenido de la pestaña General.
          </TabPanel>
          <TabPanel class="text-muted-foreground pt-3 text-sm">
            Contenido de la pestaña Cuenta.
          </TabPanel>
        </TabPanels>
      </TabGroup>
    </Card>

    <Card class="gap-3">
      <h2 class="text-lg font-medium">Paginación</h2>
      <Pagination :data="paginaDemo" :items-per-page="10" />
    </Card>
  </div>
</template>
