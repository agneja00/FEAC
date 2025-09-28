import styles from "../user/Form.module.scss";
import { Field, Form, Formik, ErrorMessage } from "formik";
import { useSnackbar } from "notistack";
import FormikField from "../common/FormikField";
import {
  ServiceRegisterValidationSchema,
  serviceRegisterInitialValues,
} from "./consts";
import Button from "../common/Button";
import { NewService } from "./types";
import { sendServiceEmail } from "./api";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

interface ServiceRegisterFormProps {
  onSubmitSuccess?: () => void;
}

const ServiceRegisterForm: React.FC<ServiceRegisterFormProps> = ({
  onSubmitSuccess,
}) => {
  const { enqueueSnackbar } = useSnackbar();
  const { t } = useTranslation();
  const { lang = "en" } = useParams<{ lang: string }>();
  const validatedLang =
    lang === "en" || lang === "lt" || lang === "ru" ? lang : "en";

  const CATEGORY_OPTIONS = [
    { key: "Shifting", label: t("categories.shifting") },
    { key: "Repair", label: t("categories.repair") },
    { key: "Plumbing", label: t("categories.plumbing") },
    { key: "Cleaning", label: t("categories.cleaning") },
    { key: "Painting", label: t("categories.painting") },
    { key: "Electric", label: t("categories.electric") },
    { key: "Decoration", label: t("categories.decoration") },
  ];

  const handleSubmit = async (
    formValues: NewService,
    { resetForm }: { resetForm: () => void },
  ) => {
    try {
      await sendServiceEmail(validatedLang, formValues);
      enqueueSnackbar(t("messages.emailSendSuccess"), { variant: "success" });
      resetForm();

      if (onSubmitSuccess) {
        onSubmitSuccess();
      }
    } catch (error) {
      enqueueSnackbar(
        error instanceof Error ? error.message : t("messages.emailSendError"),
        { variant: "error" },
      );
    }
  };

  return (
    <Formik
      initialValues={serviceRegisterInitialValues}
      validationSchema={ServiceRegisterValidationSchema(validatedLang)}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form className={styles.form}>
          <h2 className={styles.subtitle}>
            {t("forms.registerService.title")}
          </h2>
          <FormikField
            label={t("forms.registerService.serviceName")}
            name="name"
            required
          />
          <div className={styles.aboutContainer}>
            <label className={styles.label} htmlFor="about">
              {t("forms.registerService.description")}
              <span className={styles.requiredAsterisk}> *</span>
            </label>
            <Field
              as="textarea"
              name="about"
              id="about"
              className={styles.textarea}
            />
            <ErrorMessage
              name="about"
              component="div"
              className={styles.error}
            />
          </div>
          <FormikField
            label={t("forms.registerService.companyAddress")}
            name="address"
            required
          />
          <div className={styles.selectContainer}>
            <label className={styles.label} htmlFor="category">
              {t("forms.registerService.category")}
              <span className={styles.requiredAsterisk}> *</span>
            </label>
            <Field
              as="select"
              name="category"
              id="category"
              className={styles.select}
            >
              <option value="">{t("forms.registerService.select")}</option>
              {CATEGORY_OPTIONS.map(({ key, label }) => (
                <option key={key} value={key}>
                  {label}
                </option>
              ))}
            </Field>
            <ErrorMessage name="category">
              {(msg) => <div className={styles.error}>{t(msg)}</div>}
            </ErrorMessage>
          </div>
          <FormikField
            label={t("forms.registerService.contact")}
            name="contactPerson"
            required
          />
          <FormikField
            type="email"
            label={`${t("common.email")}:`}
            name="email"
            required
          />
          <Button type="submit" disabled={isSubmitting}>
            {t("buttons.completeTheForm")}
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default ServiceRegisterForm;
