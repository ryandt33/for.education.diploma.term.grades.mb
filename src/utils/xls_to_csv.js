import * as XLSX from "xlsx/xlsx.mjs";

const parse_xls = async (file) => {
  const term_grades = XLSX.read(await file.arrayBuffer(), { type: "array" });

  const teachers = term_grades.Sheets["Diploma by Teacher"];

  console.log(term_grades);

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
    let csv =
      "teacher,class_name,class_id,subject,level,grade,student_id,last_name,first_name,average,final_grade";

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

      console.log(teacher, current_teacher_row, next_teacher_row);

      for (let x = current_teacher_row + 1; x < next_teacher_row; x++) {
        csv += `\n${teacher},${teachers[`A${x}`].v},${teachers[`B${x}`].v},${
          teachers[`C${x}`].v
        },${teachers[`D${x}`].v},${teachers[`E${x}`].v},${
          teachers[`F${x}`].v
        },${teachers[`G${x}`].v},${teachers[`H${x}`].v},${
          teachers[`J${x}`].v
        },${teachers[`K${x}`].v}`;
      }
    }

    return csv;
  };

  const csv = generate_csv(teachers, filter_teachers(teachers));

  return csv;
};

export default parse_xls;
