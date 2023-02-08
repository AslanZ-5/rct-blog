import React, { useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { useForm } from "react-hook-form";
import { Navigate, useParams } from "react-router-dom";
import { TagsInput } from "react-tag-input-component";
import PropTypes from "prop-types";
import classes from "./articleform.module.scss";
import articleFormValidation from "../../validations/articleFormValidation";

const ArticleForm = ({ article, type }) => {
  const defTags = article ? [...article.tagList] : [];
  const { slug: slugParam } = useParams();
  const [validationError, setValidationError] = useState(false);
  const [selected, setSelected] = useState(defTags);
  const [slug, setSlug] = useState("");
  const url = !slugParam
    ? "https://blog.kata.academy/api/articles"
    : `https://blog.kata.academy/api/articles/${slugParam}`;
  const defaultVAl = article
    ? {
        title: article.title,
        description: article.description,
        text: article.body,
      }
    : "";
  const {
    register,
    handleSubmit,
    // watch,
    formState: { errors },
  } = useForm({
    defaultValues: defaultVAl,
  });

  const createArticle = async ({ title, description, text }) => {
    try {
      const response = await axios(url, {
        method: type,
        headers: {
          Authorization: `Bearer ${Cookies.get("_auth")}`,
          "Content-Type": "application/json",
        },
        data: JSON.stringify({
          article: {
            title,
            description,
            body: text,
            tagList: selected,
          },
        }),
      });

      setSlug(response.data.article.slug);
    } catch (err) {
      console.log(err);
    }
  };
  const onSubmit = async (data) => {
    const isValid = await articleFormValidation.isValid(data);
    if (isValid) {
      createArticle(data);
    } else {
      setValidationError(true);
    }
  };
  if (slug) {
    return (
      <Navigate
        to={{
          pathname: `/details/${slug}`,
        }}
      />
    );
  }
  return (
    <div className={classes.container}>
      <h1 className={classes.header}>
        {type === "PUT" ? "Edit" : "Create"} new article
      </h1>
      <form className={classes.createForm} onSubmit={handleSubmit(onSubmit)}>
        {validationError && (
          <p style={{ color: "red" }}> Validation Error!!!!</p>
        )}
        <label className={classes.artLab} htmlFor="title">
          Title
        </label>
        <input
          placeholder="Title"
          id="title"
          className={classes.artInput}
          {...register("title", { required: true })}
        />
        <label className={classes.artLab} htmlFor="desc">
          Short Description
        </label>
        <input
          placeholder="Short Description"
          id="desc"
          className={classes.artInput}
          {...register("description", { required: true })}
        />
        <label className={classes.artLab} htmlFor="text">
          Text
        </label>
        <textarea
          placeholder="Short Description"
          id="text"
          className={classes.artInput}
          {...register("text", { required: true })}
        />
        {errors.title && <span>This field is required</span>}
        <div className={classes.tagsInput}>
          <TagsInput
            value={selected}
            onChange={setSelected}
            name="tags"
            placeHolder="enter Tags"
          />
        </div>

        <button className={classes.artBtn} type="submit">
          {type === "PUT" ? "Edit" : "Send"}
        </button>
      </form>
    </div>
  );
};
ArticleForm.defaultProps = {
  article: null,
  type: "POST",
};
ArticleForm.propTypes = {
  article: PropTypes.object,
  type: PropTypes.string,
};
export default ArticleForm;
