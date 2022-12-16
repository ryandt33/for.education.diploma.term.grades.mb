import FileUpload from "../file_upload/File_Upload";
import ImageText from "../image_text/ImageText";

import { useEffect, useState } from "react";
import xls_to_csv from "../../utils/xls_to_csv";
import mb_leftnav from "../../images/screenshots/mb-leftnav.png";
import mb_report_history from "../../images/screenshots/mb-report-history.png";
import mb_download from "../../images/screenshots/mb-download.png";
import pbi_options from "../../images/screenshots/pbi-options.png";
import pbi_datasource from "../../images/screenshots/pbi-datasource.png";
import ls_copy from "../../images/screenshots/ls-copy.png";
import ls_source from "../../images/screenshots/ls-source.png";
import ls_csv from "../../images/screenshots/ls-csv.png";
import visualization_subject from "../../images/screenshots/visualization-subject.png";
import visualization_overview from "../../images/screenshots/visualization-overview.png";
import visualization_student from "../../images/screenshots/visualization-student.png";
import visualization_report from "../../images/screenshots/visualization-report.png";
import email from "../../images/email.svg";
import Jumbotron from "../jumbotron/Jumbotron";

const Container = () => {
  const [file, setFile] = useState(null);
  const [csv, setCsv] = useState(null);
  const content = {
    widget: (
      <div>
        {" "}
        <h2>The Convertor</h2>
        <p className="container__text">
          Drag and drop your file here to convert to an XLS. If you're not sure
          what to do, look at the{" "}
          <span
            className="container__span_nav"
            onClick={() => setNavigator("visualizations")}
          >
            visualizations
          </span>{" "}
          and{" "}
          <span
            className="container__span_nav"
            onClick={() => setNavigator("how_to")}
          >
            how to
          </span>{" "}
          tabs.
        </p>{" "}
        <p className="container__text container__text__warning">
          <b>Important:</b> For.Education never gets access to your file - when
          you drag it onto the box, all processing is done on your computer
          through the web browser. Your web browser converts the data from an
          XLS to CSV, and then downloads it back to your computer.
          <br />
          <br />
          <b>Warning:</b> This file contains confidential information. Do not
          share it with anyone, and be careful where you upload it.
        </p>
        <FileUpload setFile={setFile} />
        {file ? (
          <div
            className="container__file-convert"
            onClick={() => {
              convert_file();
            }}
          >
            Convert
          </div>
        ) : (
          ""
        )}
      </div>
    ),
    visualizations: (
      <div>
        <h2>The Visualizations</h2>
        <p className="container__text">
          These simple visualizations offer you three initials views of your
          data. You can then use the data to create your own visualizations.
        </p>
        <h3>Overview Analytics:</h3>
        <p className="container__text">
          This visualization shows you the average grade for each subject, as
          well as the total distribution of grades across all subjects. You can
          also quickly see how many grades are included, the average grade, how
          many 7s, and how many students below a 4.
        </p>
        <div className="container__image_box container__image_box__large">
          <img
            src={visualization_overview}
            alt="Overview Analytics"
            className="container__image_box__image"
          />
        </div>
        <h3>Subject Analytics:</h3>
        <p className="container__text">
          Ensuring that all classes receive the same level of education,
          regardless of teacher, is crucial. These analytics allow you to see
          the grade distribution across classes, as well as the lowest, average
          and highest grade in each class. This is a great start for end of term
          or year review within subject groups to ensure horizontal articulation
          of curriculum and identify assessment variances across the program.
        </p>{" "}
        <div className="container__image_box container__image_box__large">
          <img
            src={visualization_subject}
            alt="Subject Analytics"
            className="container__image_box__image"
          />
        </div>{" "}
        <h3>Student Analytics:</h3>
        <p className="container__text">
          This page allows you to see the total scores that students have across
          the DP program. You can filter for certain grades (to see all students
          who are excelling or struggling), as well as seeing each students HL,
          SL and overall grades.
        </p>{" "}
        <div className="container__image_box container__image_box__large">
          <img
            src={visualization_student}
            alt="Student Analytics"
            className="container__image_box__image"
          />
        </div>{" "}
        <h3>Report Analytics:</h3>
        <p className="container__text">
          This page shows potential issues with your reports. It allows you to
          see missing grades and missing comments by class.
        </p>
        <p className="container__text">
          <b>Note:</b> Due to limitations with data studio (calculated fields
          aren't imported when making a copy), the widget has to normalize all
          final grades into number values. Therefore, letter grades are replaced
          with blanks by the process and will show up as missing.
        </p>
        <div className="container__image_box container__image_box__large">
          <img
            src={visualization_report}
            alt="Report Analytics"
            className="container__image_box__image"
          />
        </div>
      </div>
    ),
    how_to: (
      <div>
        <h2>Table of Contents</h2>
        <div className="nav_pane">
          <ul className="nav_pane__list">
            <li className="nav_pane__list-item">
              <a href="#mb">Export Term Grades from ManageBac</a>
            </li>
            <li className="nav_pane__list-item">
              <a href="#convert">Convert the file to CSV</a>
            </li>
            <li className="nav_pane__list-item">
              <a href="#dashboard">Visualize it</a>
            </li>
            <ul className="nav_pane__list">
              <li className="nav_pane__list-item">
                <a href="#pbi">PowerBI</a>
              </li>
              <li className="nav_pane__list-item">
                <a href="#ls">Looker Studio</a>
              </li>
            </ul>
          </ul>
        </div>
        <h2 className="container__title" id="mb">
          {" "}
          Export Term Grades from ManageBac
        </h2>
        <ImageText
          image={{
            src: mb_leftnav,
            alt: "ManageBac Left Navigation",
          }}
          text={`To export the term grades from ManageBac, go to the reporting tab
              on the left side of the screen (if your navigation menue is
              collapsed, it will be under Insights > Reporting).`}
        />
        <ImageText
          image={{
            src: mb_report_history,
            alt: "ManageBac Report History",
          }}
          text={`Then, click on the Reports History button at the top of the screen.
            You should default to IB Diploma - if not, make sure to select this
            program (this only works for Diploma courses with final grades,
            unfortunately custom rubrics are not support for these exports).`}
        />
        <ImageText
          image={{
            src: mb_download,
            alt: "ManageBac Download",
          }}
          text={`Find the reports that you would like to export, and click on the three
            dots on the right side of the screen. Then click, "Download Term
            Grades ZIP".`}
        />
        <p className="container__text">Extract the zip file.</p>
        <h2 className="container__title" id="convert">
          {" "}
          Convert the file to CSV
        </h2>
        <p className="container__text">
          In order to use the file with a visualization platform, you will need
          to convert it to CSV format. To do this, upload the file below (either
          drag and drop or select the file).
        </p>
        <p className="container__text">
          <b>Remember:</b> You need to upload the diploma_term_grades.xls file,
          not the zip file.
        </p>
        <p className="container__text container__text__warning">
          <b>Important:</b> For.Education never gets access to your file - when
          you drag it onto the box, all processing is done on your computer
          through the web browser. Your web browser converts the data from an
          XLS to CSV, and then downloads it back to your computer.
          <br />
          <br />
          <b>Warning:</b> This file contains confidential information. Do not
          share it with anyone, and be careful where you upload it.
        </p>
        <FileUpload setFile={setFile} />
        {file ? (
          <div
            className="container__file-convert"
            onClick={() => {
              convert_file();
            }}
          >
            Convert
          </div>
        ) : (
          ""
        )}
        <h2 className="container__title" id="dashboard">
          {" "}
          Visualize it
        </h2>
        <p className="container__text">
          Once you have converted the file, you can visualize it using either
          PowerBI or Google Data Studio.
        </p>
        <h3 className="container__title" id="pbi">
          PowerBI
        </h3>
        <p className="container__text">
          To visualize the file in PowerBI,{" "}
          <a href="/MB_DP_Analytics.pbix">
            you will need to download this file.
          </a>
          This file already has dashboards setup with dummy data.
        </p>
        <p className="container__text">
          If you do not have PowerBI,{" "}
          <a href="https://powerbi.microsoft.com/en-us/downloads/">
            you can download it for free here.
          </a>
        </p>
        <p className="container__text">
          Once you have opened the PowerBI file, click on file in the top left
          corner, and then <u>Options and settings</u>.
        </p>
        <ImageText
          image={{
            src: pbi_options,
            alt: "PowerBI Options",
          }}
          text={`Click on the "Change Source" button, and then select the CSV file that
            you converted.`}
        />
        <ImageText
          image={{
            src: pbi_datasource,
            alt: "PowerBI Data Source",
          }}
          text={`You can now view the dashboards, and edit them to your liking.`}
        />
        <h3 className="container__title" id="ls">
          Looker Studio
        </h3>
        <p className="container__text">
          To begin exploring your data in Looker Studio,{" "}
          <a href="https://datastudio.google.com/reporting/e50a3387-e7cf-419e-94b7-982db707366b">
            click on this link.
          </a>
        </p>
        <ImageText
          image={{
            src: ls_copy,
            alt: "Looker Studio Copy",
          }}
          text={`In the top right corner, click on the three dots and then click "Make
            a copy"`}
        />
        <ImageText
          image={{
            src: ls_source,
            alt: "Looker Studio Data Source",
          }}
          text={`In the popup, click on the New Data Source and select "Create data
            source"`}
        />
        <ImageText
          image={{
            src: ls_csv,
            alt: "Looker Studio CSV Upload",
          }}
          text={`Type in CSV, and upload your new CSV file.`}
        />
        <p className="container__text">
          Wait until the file has uploaded, and then click the CONNECT button in
          the top right corner. On the next screen, click "Add To Report" in the
          same location. Finall, click "Copy Report" in the popup.
        </p>{" "}
        <p className="container__text">
          You can now view the dashboards, and edit them to your liking.
        </p>
        <h2>Going Further:</h2>
        <p className="container__text">
          We hope that these dashboards are useful to you. Feel free to share
          this page and edit the dashboards to best suit your needs.
        </p>
      </div>
    ),
  };
  const [navigator, setNavigator] = useState(Object.keys(content)[0]);

  useEffect(() => {
    // if csv has a value, then mount the file for download
    if (csv) {
      const element = document.createElement("a");
      const file = new Blob([csv], { type: "text/plain" });
      element.href = URL.createObjectURL(file);
      element.download = "diploma_term_grades.csv";
      document.body.appendChild(element); // Required for this to work in FireFox
      element.click();
    }
  }, [csv]);

  const convert_file = async () => {
    if (!file) return null;

    const csv_file = await xls_to_csv(file);

    setCsv(csv_file);
  };

  return (
    <div className="container">
      <Jumbotron />
      <p className="container__text">
        Understanding how our students are performing is the first step to
        supporting their learning. This simple guide will get you started with
        visualizing your ManageBac Diploma Term Grades.
      </p>
      <nav className="container__nav">
        {Object.keys(content).map((key) => (
          <div
            className={`container__nav__item ${
              navigator === key ? "container__nav__item__active" : ""
            }`}
            onClick={() => {
              setNavigator(key);
            }}
          >
            {key.toUpperCase().replaceAll("_", " ")}
          </div>
        ))}
      </nav>
      <div className="container__main">{content[navigator]}</div>
      <div className="container__cta">
        <p className="container__text">
          At For.Education, we specialize in helping schools put their data to
          work. If you would like to explore how data can help your school,
          please don't hesitate to contact us.
        </p>
        <div className="container__image_box container__image_box__small">
          <a href="mailto:ryan@for.education">
            <img
              src={email}
              alt="PowerBI Data Source"
              className="container__image_box__image"
            />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Container;
