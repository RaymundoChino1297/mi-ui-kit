<script setup>
import { ref } from "vue";
import { MoreHorizontal } from "lucide-vue-next";
import Button from "@/components/ui/Button.vue";
import Input from "@/components/ui/Input.vue";
import Select from "@/components/ui/Select.vue";
import Tag from "@/components/ui/Tag.vue";
import Card from "@/components/ui/Card.vue";
import Dialog from "@/components/ui/Dialog.vue";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { toast } from "@/composables/useToast";
import { useAlertDialog } from "@/composables/useAlertDialog";

const { danger } = useAlertDialog();

const nombre = ref("");
const rolDialog = ref("dev");
const dialogOpen = ref(false);

const filasDemo = ref([
  { id: 1, name: "Cliente demo A", status: "Activo" },
  { id: 2, name: "Cliente demo B", status: "Pendiente" },
  { id: 3, name: "Cliente demo C", status: "Activo" },
]);

const guardarDialog = () => {
  dialogOpen.value = false;
  toast({
    title: "Registro guardado",
    description: `Nombre: ${nombre.value || "—"}`,
  });
};

const eliminarFila = async (fila) => {
  const ok = await danger(
    "Eliminar registro",
    `¿Eliminar "${fila.name}"?`
  );
  if (ok) {
    filasDemo.value = filasDemo.value.filter((r) => r.id !== fila.id);
    toast({ title: "Eliminado", description: fila.name });
  }
};
</script>

<template>
  <div class="mx-auto flex w-full max-w-4xl flex-col gap-4">
    <Card class="gap-4">
      <div class="flex flex-wrap items-center justify-between gap-2">
        <p class="text-muted-foreground text-sm">
          Listado con datos ficticios (sin API).
        </p>
        <div class="flex flex-wrap gap-2">
          <Button @click="dialogOpen = true">Nuevo registro</Button>
          <Button
            variant="outline"
            @click="
              toast({
                title: 'Hola',
                description: 'Notificación de ejemplo',
              })
            "
          >
            Toast
          </Button>
        </div>
      </div>

      <div class="overflow-hidden rounded-md border border-border">
        <table class="w-full text-sm">
          <thead class="bg-muted/50 border-b border-border">
            <tr>
              <th class="px-3 py-2 text-left font-medium">Nombre</th>
              <th class="px-3 py-2 text-left font-medium">Estado</th>
              <th class="w-12 px-3 py-2" />
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="fila in filasDemo"
              :key="fila.id"
              class="border-b border-border last:border-0"
            >
              <td class="px-3 py-2">{{ fila.name }}</td>
              <td class="px-3 py-2">
                <Tag :variant="fila.status === 'Activo' ? 'success' : 'warning'">
                  {{ fila.status }}
                </Tag>
              </td>
              <td class="px-3 py-2 text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <Button variant="ghost" size="icon" class="size-8">
                      <MoreHorizontal class="size-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem
                      @click="
                        nombre = fila.name;
                        dialogOpen = true;
                      "
                    >
                      Editar
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      variant="destructive"
                      @click="eliminarFila(fila)"
                    >
                      Eliminar
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </Card>

    <Dialog
      v-model="dialogOpen"
      title="Editar registro"
      description="Formulario de ejemplo dentro de un dialog."
    >
      <div class="space-y-4">
        <Input v-model="nombre" label="Nombre" placeholder="Nombre" />
        <Select v-model="rolDialog" label="Rol">
          <template #select>
            {{ rolDialog === "dev" ? "Desarrollador" : "Diseño" }}
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
      </div>
      <template #footer>
        <Button variant="outline" @click="dialogOpen = false">Cancelar</Button>
        <Button @click="guardarDialog">Guardar</Button>
      </template>
    </Dialog>
  </div>
</template>
