import { useTranslation } from "react-i18next";

function RetunsRefundCancellation() {
  const { t, i18n } = useTranslation();
  return (
    <section className="termsSec sectionPD">
      <div className="container">
        <div className="termsInfo">
          <h4>{t("returnsTitle")}</h4>
          <div className="panel-body">
            <p>
              <strong>{t("returns1Title")}</strong>
            </p>
            <p>
              {t("returns1Content1")}
            </p>
            <p>
              {t("returns1Content2")}
            </p>

            <p>
              <strong>{t("returns2Title")}</strong>
            </p>
            <p>
              {t("returns2Content1")}
            </p>
            <p>{t("returns2Content2")}</p>

            <p>
              <strong>{t("returns3Title")}</strong>
            </p>
            <p>
              {t("returns3Content1")}
            </p>
            <p>
               {t("returns3Content2")}
            </p>

            <p>
              <strong>{t("returns4Title")}</strong>
            </p>
            <p>{t("returns4Bullet1")}</p>
            <p>{t("returns4Bullet2")}</p>

            <p>
              <strong>{t("returns5Title")}</strong>
            </p>
            <p>
              {t("returns5Bullet1")}
            </p>
            <p>{t("returns5Bullet1")}</p>

            <p>
              <strong>{t("returns6Title")}</strong>
            </p>
            <p>
              {t("returns6Content1")}
              {t("returns6Content2")}
              {t("returns6Content3")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default RetunsRefundCancellation;
