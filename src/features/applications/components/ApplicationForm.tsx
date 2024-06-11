import { z } from "zod";

import { ImageUpload } from "~/components/ImageUpload";
import { IconButton } from "~/components/ui/Button";
import {
  ErrorMessage,
  FieldArray,
  Form,
  FormControl,
  FormSection,
  Input,
  Label,
  Select,
  Textarea,
} from "~/components/ui/Form";
import { Spinner } from "~/components/ui/Spinner";
import { impactCategories } from "~/config";
import {
  ApplicationSchema,
  ProfileSchema,
  contributionTypes,
  fundingSourceTypes,
  impactTypes
} from "../types";
import { useCreateApplication } from "../hooks/useCreateApplication";
import { toast } from "sonner";
import { useController, useFormContext } from "react-hook-form";
import { Tag } from "~/components/ui/Tag";
import { useIsCorrectNetwork } from "~/hooks/useIsCorrectNetwork";
import { useLocalStorage } from "react-use";
import { Alert } from "~/components/ui/Alert";
import { useAccount } from "wagmi";

const ApplicationCreateSchema = z.object({
  profile: ProfileSchema,
  application: ApplicationSchema,
});

export function ApplicationForm({ address = "" }) {
  const clearDraft = useLocalStorage("application-draft")[2];

  const create = useCreateApplication({
    onSuccess: () => {
      toast.success("Application created successfully!");
      clearDraft();
    },
    onError: (err: { reason?: string; data?: { message: string } }) =>
      toast.error("Application create error", {
        description: err.reason ?? err.data?.message,
      }),
  });
  if (create.isSuccess) {
    return (
      <Alert variant="success" title="Aplicación enviada!">
        Será revisada por nuestros administradores
      </Alert>
    );
  }
  const error = create.error;
  return (
    <div>
      <Form
        defaultValues={{
          application: {
            payoutAddress: address,
            contributionLinks: [{}],
            impactMetrics: [{}],
            fundingSources: [{}],
          },
        }}
        persist="application-draft"
        schema={ApplicationCreateSchema}
        onSubmit={async ({ profile, application }) => {
          console.log(application, profile);
          create.mutate({ application, profile });
        }}
      >
        <FormSection
          title="Perfil"
          description="Configura tu nombre de perfil, elige tu avatar  e imagen de fondo para tu proyecto"
        >
          <FormControl name="profile.name" label="Nombre de perfil" required>
            <Input placeholder="Tu Nombre" />
          </FormControl>
          <div className="mb-4 gap-4 md:flex">
            <FormControl
              required
              label="Avatar del Proyecto"
              name="profile.profileImageUrl"
            >
              <ImageUpload className="h-48 w-48 " />
            </FormControl>
            <FormControl
              required
              label="Imagen de fondo del proyecto"
              name="profile.bannerImageUrl"
              className="flex-1"
            >
              <ImageUpload className="h-48 " />
            </FormControl>
          </div>
        </FormSection>
        <FormSection
          title="Aplicación"
          description="Configura tu aplicación y la dirección de pago a la que se transferirán los fondos."
        >
          <FormControl name="application.name" label="Nombre" required>
            <Input placeholder="Nombre del Proyecto" />
          </FormControl>

          <FormControl name="application.bio" label="Descripción" required>
            <Textarea rows={4} placeholder="Descripción del Proyecto" />
          </FormControl>
          <div className="gap-4 md:flex">

            <FormControl
              className="flex-1"
              name="application.twitterUrl"
              label="X (Twitter)"
              required
            >
              <Input placeholder="https://" />
            </FormControl>

            {/* New */}
            <FormControl
              className="flex-1"
              name="application.telegramUrl"
              label="Telegram"
              required
            >
              <Input placeholder="https://t.me/" />
            </FormControl>

            {/* New */}
            <FormControl
              className="flex-1"
              name="application.email"
              label="Email"
              required
            >
              <Input placeholder="user@mail.com" />
            </FormControl>
            
          </div>

          <div className="gap-4 md:flex">
            <FormControl
                className="flex-1"
                name="application.payoutAddress"
                label="Dirección de pago EVM (NO exchange)"
                required
              >
              <Input placeholder="0x..." />
            </FormControl>
          </div>
        </FormSection>

        <FormSection
          title="Contribución e Impacto"
          description="Describe la contribución y el impacto de tu proyecto"
        >
          <FormControl
            name="application.contributionDescription"
            label="Descripción de la Contribución"
            required
          >
            <Textarea
              rows={4}
              placeholder="¿Cuál ha sido la contribución de tu proyecto?"
            />
          </FormControl>

          <FormControl
            name="application.impactDescription"
            label="Descripción del Impacto"
            required
          >
            <Textarea
              rows={4}
              placeholder="¿Cuál ha sido el impacto de tu proyecto?"
            />
          </FormControl>
          <ImpactTags />
        </FormSection>

        <FormSection
          title="Links de Contribución"
          description="¿Dónde podemos encontrar las contribuciones?"
        >
          <FieldArray
            name="application.contributionLinks"
            renderField={(field, i) => (
              <>
                <FormControl
                  className="min-w-96 flex-1"
                  name={`application.contributionLinks.${i}.description`}
                  required
                >
                  <Input placeholder="Descripción" />
                </FormControl>
                <FormControl
                  name={`application.contributionLinks.${i}.url`}
                  required
                >
                  <Input placeholder="https://" />
                </FormControl>
                <FormControl
                  name={`application.contributionLinks.${i}.type`}
                  required
                >
                  <Select>
                    {Object.entries(contributionTypes).map(([value, label]) => (
                      <option key={value} value={value}>
                        {label}
                      </option>
                    ))}
                  </Select>
                </FormControl>
              </>
            )}
          />
        </FormSection>

        <FormSection
          title="Métricas de Impacto"
          description="¿Qué impacto ha tenido tu proyecto?"
        >
          <FieldArray
            name="application.impactMetrics"
            renderField={(field, i) => (
              <>
                <FormControl
                  className="min-w-96 flex-1"
                  name={`application.impactMetrics.${i}.description`}
                  required
                >
                  <Input placeholder="Descripción" />
                </FormControl>
                <FormControl
                  name={`application.impactMetrics.${i}.url`}
                  required
                >
                  <Input placeholder="https://" />
                </FormControl>
                <FormControl
                  name={`application.impactMetrics.${i}.number`}
                  required
                  valueAsNumber
                >
                  <Input type="number" placeholder="Número" />
                </FormControl>
              </>
            )}
          />
          {/* New */}
          <div className="gap-4 md:flex">
            <FormControl
              name={`application.impactAmount`}
              label="¿Cuánto consideras que vale en USD tu impacto?"
              required
              valueAsNumber
            >
              <Input type="number" placeholder="Cantidad" />
            </FormControl>


            <FormControl
                  name={`application.impactClassification`}
                  label="¿Cómo clasificarías tu impacto?"
                  required
                >
                  <Select>
                    {Object.entries(impactTypes).map(
                      ([value, label]) => (
                        <option key={value} value={value}>
                          {label}
                        </option>
                      ),
                    )}
                  </Select>
            </FormControl> 

          </div>
        </FormSection>

        <FormSection
          title="Fuentes de financiamiento"
          description="¿De qué fuentes ha recibido financiación?"
        >
          <FieldArray
            name="application.fundingSources"
            renderField={(field, i) => (
              <>
                <FormControl
                  className="min-w-96 flex-1"
                  name={`application.fundingSources.${i}.description`}
                  required
                >
                  <Input placeholder="Descripción" />
                </FormControl>
                <FormControl
                  name={`application.fundingSources.${i}.amount`}
                  required
                  valueAsNumber
                >
                  <Input type="number" placeholder="Cantidad" />
                </FormControl>
                <FormControl
                  name={`application.fundingSources.${i}.currency`}
                  required
                >
                  <Input placeholder="USD" />
                </FormControl>
                <FormControl
                  name={`application.fundingSources.${i}.type`}
                  required
                >
                  <Select>
                    {Object.entries(fundingSourceTypes).map(
                      ([value, label]) => (
                        <option key={value} value={value}>
                          {label}
                        </option>
                      ),
                    )}
                  </Select>
                </FormControl>
              </>
            )}
          />
        </FormSection>

        

        {error ? (
          <div className="mb-4 text-center text-gray-600 dark:text-gray-400">
            Asegurate de no estar usando una VPN, ya que puede interferir con el servicio.
          </div>
        ) : null}

        <CreateApplicationButton
          isLoading={create.isPending}
          buttonText={
            create.isUploading
              ? "Subiendo datos"
              : create.isAttesting
                ? "Creando Certificado"
                : "Enviar Aplicación"
          }
        />
      </Form>
    </div>
  );
}

function CreateApplicationButton({
  isLoading,
  buttonText,
}: {
  isLoading: boolean;
  buttonText: string;
}) {
  const { isCorrectNetwork, correctNetwork } = useIsCorrectNetwork();

  const { address } = useAccount();
  return (
    <div className="flex items-center justify-between">
      <div>
        {!address && <div>Debes conectar tu wallet para crear una aplicación</div>}
        {!isCorrectNetwork && (
          <div className="flex items-center gap-2">
            You must be connected to {correctNetwork.name}
          </div>
        )}
      </div>

      <IconButton
        icon={isLoading ? Spinner : null}
        disabled={isLoading}
        variant="primary"
        type="submit"
        isLoading={isLoading}
      >
        {buttonText}
      </IconButton>
    </div>
  );
}

function ImpactTags() {
  const { control, watch, formState } =
    useFormContext<z.infer<typeof ApplicationCreateSchema>>();
  const { field } = useController({
    name: "application.impactCategory",
    control,
  });

  const selected = watch("application.impactCategory") ?? [];

  const error = formState.errors.application?.impactCategory;
  return (
    <div className="mb-4">
      <Label>
      Categorías de impacto<span className="text-red-300">*</span>
      </Label>
      <div className="flex flex-wrap gap-2">
        {Object.entries(impactCategories).map(([value, { label }]) => {
          const isSelected = selected.includes(value);
          return (
            <Tag
              size="lg"
              selected={isSelected}
              key={value}
              onClick={() => {
                const currentlySelected = isSelected
                  ? selected.filter((s) => s !== value)
                  : selected.concat(value);

                field.onChange(currentlySelected);
              }}
            >
              {label}
            </Tag>
          );
        })}
      </div>
      {error && <ErrorMessage>{error.message}</ErrorMessage>}
    </div>
  );
}
