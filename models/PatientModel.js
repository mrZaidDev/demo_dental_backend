import mongoose from "mongoose";
import AutoIncrementFactory from "mongoose-sequence";
const AutoIncrement = AutoIncrementFactory(mongoose);

const PatientSchema = new mongoose.Schema(
  {
    Name: {
      type: String,
      required: true,
    },
    PhoneNumber: {
      type: String,
      required: true,
    },
    details: {
      type: String,
      required: true,
    },
    total: {
      type: Number,
      required: true,
    },
    advance: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

PatientSchema.plugin(AutoIncrement, {
  inc_field: "SN",
  start_seq: 1,
  id: "patient_sn_counter",
});

const Patient = mongoose.model("Patient", PatientSchema);
export default Patient;
