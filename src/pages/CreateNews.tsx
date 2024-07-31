import { CustomToolbar } from "@/components/news/CustomToolbar";
import { FC, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import * as Yup from "yup";
import { motion } from "framer-motion";
import { Formik, Form, FormikHelpers } from "formik";
import { toast } from "@/components/ui/use-toast";
import { CloudUpload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface CreateNewsProps {}
const CreateNews: FC<CreateNewsProps> = () => {
  const [loading, setLoading] = useState(false);
  const formValidationSchema = Yup.object().shape({
    title: Yup.string().required("Blog Title is Required"),
    imageDoc: Yup.mixed().required("Blog Image is required"),
    description: Yup.mixed().required("Contest Description is Required"),
  });

  const submitForm = async (
    values: {
      title: string;
      post?: string;
      imageDoc: string;
      description: string;
    },
    actions: FormikHelpers<{
      title: string;
      post: string;
      imageDoc: string;
      description: string;
    }>
  ) => {
    const formData = new FormData();
    formData.append("title", values?.title);
    formData.append("body", values?.description);
    formData.append("image", values?.imageDoc);

    try {
      setLoading(true);

      toast({
        title: "Blog created Successfully",
      });

      actions.resetForm();
    } catch (error) {
      toast({
        title: "Blog created Successfully",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="md:p-8 flex flex-col gap-12">
      <h4 className="text-black text-xl font-semibold">Create News</h4>

      <div className="flex items-center ">
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ ease: "easeIn", duration: 0.5 }}
          className="w-full"
        >
          <div className="flex flex-col gap-6  border border-solid p-8">
            {" "}
            {/* h-[670px] */}
            <div className="h-auto">
              <Formik
                initialValues={{
                  title: "",
                  post: "",
                  imageDoc: "",
                  description: "",
                }}
                validationSchema={formValidationSchema}
                enableReinitialize={true}
                onSubmit={(values, actions) => {
                  // window.scrollTo(0, 0)
                  console.log(values, "often");
                  submitForm(values, actions);
                }}
              >
                {({
                  handleSubmit,
                  handleChange,

                  setFieldValue,
                  errors,
                  touched,
                  // setFieldTouched,
                  values,
                }) => (
                  <Form onSubmit={handleSubmit} className="flex flex-col ">
                    <div className="flex flex-col gap-12 ">
                      <div className="flex flex-col gap-4">
                        <label
                          htmlFor="title"
                          className="text-base text-left font-semibold text-[#000000]"
                        >
                          Title
                        </label>
                        <Input
                          name="title"
                          placeholder="Blog Title"
                          type="text"
                          value={values.title}
                          onChange={handleChange}
                        />
                        {errors.title && touched.title ? (
                          <div className="text-RED-_100">{errors.title}</div>
                        ) : null}
                      </div>

                      <div className="flex flex-col xs:mt-4 lg:mt-0 ">
                        {values?.imageDoc ? (
                          <div className="pt-0 ">
                            <img
                              alt="upload"
                              width={"300px"}
                              height={"100px"}
                              //   src={URL.createObjectURL(values?.imageDoc)}
                            />
                          </div>
                        ) : (
                          <label className="flex flex-col xs:w-full  h-56 py-4 px-0  border-2 bg-BLUE-_300 border-BLUE-_200 border-dashed">
                            <div className="flex flex-col my-auto items-center">
                              <CloudUpload />
                              <div className="text-center font-medium text-md text-black">
                                Click to upload{" "}
                                <span className="block text-black">
                                  PNG or JPG (max 5mb)
                                </span>
                              </div>
                            </div>
                            <input
                              type="file"
                              name="imageDoc"
                              value={values?.imageDoc}
                              className="opacity-0"
                              onChange={(e) => {
                                setFieldValue(
                                  "imageDoc",
                                  e.target.files && e.target.files[0]
                                );
                              }}
                              id="upload"
                              accept={"image/*"}
                              multiple={false}
                            />
                          </label>
                        )}
                        {errors.imageDoc && touched.imageDoc ? (
                          <div className="text-RED-_100">{errors.imageDoc}</div>
                        ) : null}
                      </div>

                      <div className="flex flex-col gap-4 ">
                        <label
                          htmlFor="title"
                          className="text-base text-left font-semibold text-[#000000]"
                        >
                          Body
                        </label>
                        <CustomToolbar />
                        <ReactQuill
                          theme="snow"
                          value={values.description}
                          onChange={(e) => setFieldValue("description", e)}
                          modules={modules}
                          formats={formats}
                          style={{
                            backgroundColor: "#fff",
                            minHeight: "193px",
                            border: "1px solid #ccc",
                            borderRadius: "4px",
                            padding: "10px",
                          }}
                          className=" h-[193px] mt-1.5 outline-none"
                        />
                        {/* <textarea
                                        name="description"
                                        placeholder="Blog Description"
                                        type="text"
                                        rows="5"
                                        className="lg:w-[507px] rounded  h-[193px]  bg-white border border-solid mt-1.5 p-3 outline-none"                               
                                        value={values.description}
                                        onChange={handleChange}
                                    >
                                    </textarea> */}
                        {errors.description && touched.description ? (
                          <div className="text-RED-_100">
                            {errors.description}
                          </div>
                        ) : null}
                      </div>
                    </div>

                    <div className="flex xs:mt-4 md:mt-5 lg:mt-5 gap-4 justify-center">
                      <Button type="submit" isLoading={loading}>
                        Submit
                      </Button>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

const modules = {
  toolbar: {
    container: "#toolbar",
  },
};

const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "code-block",
  "link",
  "image",
  "video",
];

export default CreateNews;
