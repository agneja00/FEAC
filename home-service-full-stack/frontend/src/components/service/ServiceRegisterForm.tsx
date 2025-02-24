import styles from "../user/Form.module.scss";
import { Field, Form, Formik, ErrorMessage } from "formik";
import { useSnackbar } from "notistack";
import FormikField from "../common/FormikInput";
import {
  ServiceRegisterValidationSchema,
  serviceRegisterInitialValues,
} from "./consts";
import Button from "../common/Button";
import { NewService } from "./types";
import { sendServiceEmail } from "./api";
import { useTranslation } from "react-i18next";

interface ServiceRegisterFormProps {
  onSubmitSuccess?: () => void;
}

const ServiceRegisterForm: React.FC<ServiceRegisterFormProps> = ({
  onSubmitSuccess,
}) => {
  const { enqueueSnackbar } = useSnackbar();
  const { t } = useTranslation();

  const handleSubmit = async (
    formValues: NewService,
    { resetForm }: { resetForm: () => void },
  ) => {
    try {
      await sendServiceEmail(formValues);
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
      validationSchema={ServiceRegisterValidationSchema}
      onSubmit={handleSubmit}
    >
      <Form className={styles.form}>
        <h2 className={styles.subtitle}>{t("forms.registerService.title")}</h2>
        <FormikField
          label={t("forms.registerService.serviceName")}
          name="name"
        />
        <div className={styles.aboutContainer}>
          <label className={styles.label} htmlFor="about">
            {t("forms.registerService.description")}
          </label>
          <Field as="textarea" name="about" className={styles.textarea} />
          <ErrorMessage name="about" component="div" className={styles.error} />
        </div>
        <FormikField
          label={t("forms.registerService.companyAddress")}
          name="address"
        />
        <div className={styles.selectContainer}>
          <label className={styles.label} htmlFor="category">
            {t("forms.registerService.category")}
          </label>
          <Field as="select" name="category" className={styles.select}>
            <option value="">{t("forms.registerService.select")}</option>
            {[
              t("categories.shifting"),
              t("categories.repair"),
              t("categories.plumbing"),
              t("categories.cleaning"),
              t("categories.painting"),
              t("categories.electric"),
              t("categories.decoration"),
            ].map((category) => (
              <option key={category} value={category}>
                {category.charAt(0) + category.slice(1)}
              </option>
            ))}
          </Field>
          <ErrorMessage
            name="category"
            component="div"
            className={styles.error}
          />
        </div>
        <FormikField
          label={t("forms.registerService.contact")}
          name="contactPerson"
        />
        <FormikField type="email" label={t("common.email")} name="email" />
        <Button type="submit">{t("buttons.completeTheForm")}</Button>
      </Form>
    </Formik>
  );
};

export default ServiceRegisterForm;
