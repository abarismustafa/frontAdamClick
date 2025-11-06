import { Table } from "react-bootstrap";
import { useTranslation } from "react-i18next";

function SentRefundRequest() {
  
    const { t, i18n } = useTranslation();
  return (
    <section className="sectionPD">
      <div className="container">
        <div className="fisherman-content">
          <h3>{t("Applied Refund Request")}</h3>
        </div>
        <div className="table-responsive">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>{t("Date")}</th>
                <th>{t("Order Id")}</th>
                <th>{t("Product")}</th>
                <th>{t("Amount")}</th>
                <th>{t("Status")}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
                <td>@mdo</td>
                <td>@mdo</td>
              </tr>
            </tbody>
          </Table>
        </div>
      </div>
    </section>
  );
}
export default SentRefundRequest;
