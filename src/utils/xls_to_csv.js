import * as XLSX from "xlsx/xlsx.mjs";

// Array of letters from A to ZZ

const get_comment_index = (teachers, header_row) => {
  const letters = Array.from({ length: 26 }, (_, i) =>
    String.fromCharCode(65 + i)
  ).concat(
    Array.from(
      { length: 26 },
      (_, i) => String.fromCharCode(65) + String.fromCharCode(65 + i)
    )
  );

  for (let x = 0; x < letters.length; x++) {
    if (teachers[`${letters[x]}${header_row}`].v === "Comments") {
      return letters[x];
    }
  }

  return null;
};

const parse_xls = async (file) => {
  const term_grades = XLSX.read(await file.arrayBuffer(), { type: "array" });

  const teachers = term_grades.Sheets["Diploma by Teacher"];

  const filter_teachers = (teachers) => {
    const keys = Object.keys(teachers);

    const a_column = keys.filter((key) => key.match(/A\d+/));

    const teachers_list = a_column.filter(
      (key) =>
        teachers[key].MergeAcross &&
        key !== "A1" &&
        key !== "A2" &&
        key !== "A3"
    );

    return teachers_list;
  };

  const generate_csv = (teachers, teachers_list) => {
    try {
      let csv =
        "teacher,class_name,class_id,subject,level,grade,student_id,last_name,first_name,full_name,average,final_grade,comments";

      for (let i = 0; i < teachers_list.length; i++) {
        const teacher = teachers[teachers_list[i]].v;

        const next_teacher = teachers_list[i + 1];
        const next_teacher_row = next_teacher
          ? parseInt(next_teacher.match(/\d+/)[0]) - 1
          : // if no match, then return the last row
            parseInt(
              Object.keys(teachers)
                .filter((key) => key.match(/A\d+/))
                .pop()
                .match(/\d+/)[0]
            );
        const current_teacher_row = parseInt(teachers_list[i].match(/\d+/)[0]);

        const header_row = current_teacher_row + 1;

        const comment_index = get_comment_index(teachers, header_row);

        for (let x = current_teacher_row + 2; x < next_teacher_row; x++) {
          console.log(teachers[`K${x}`].v);
          console.log(teachers[`K${x}`].v === "N/A");
          csv += `\n"${teacher}","${teachers[`A${x}`].v}","${
            teachers[`B${x}`].v
          }","${teachers[`C${x}`].v}","${teachers[`D${x}`].v}","${
            teachers[`E${x}`].v
          }","${teachers[`F${x}`].v}","${teachers[`G${x}`].v}","${
            teachers[`H${x}`].v
          }","${teachers[`H${x}`].v} ${teachers[`G${x}`].v}","${
            teachers[`J${x}`].v
          }","${
            teachers[`K${x}`].v === "N/A"
              ? -1
              : isNaN(teachers[`K${x}`].v) ||
                teachers[`K${x}`].v.toString().match(/[a-zA-Z]/)
              ? -2
              : teachers[`K${x}`].v
          }", "${
            comment_index && teachers[`${comment_index}${x}`].v !== ""
              ? "Comment"
              : "No Comment"
          }"`;
        }
      }

      console.log("done");

      return csv;
    } catch (error) {
      console.error(error);
    }
  };
  const csv = generate_csv(teachers, filter_teachers(teachers));

  return csv;
};

export default parse_xls;
