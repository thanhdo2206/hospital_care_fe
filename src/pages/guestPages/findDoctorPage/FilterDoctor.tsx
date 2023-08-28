import { useFormik } from "formik";
import { useEffect, useRef, useState } from "react";
import CurrencyInput from "react-currency-input-field";

import Button from "../../../components/ButtonCustomize";
import { ProgressListener } from "../../../components/Progress";
import { ICategory } from "../../../interface/CategoryInterface";
import { IMedicalExaminationFilter } from "../../../interface/MedicalExaminationInterface";
import { filterMedicalExaminationTimeThunkByCategoryAndPrice } from "../../../redux/slices/medicalExaminationSlice";
import { getAllCategoryService } from "../../../services/categoryService";
import { useDispatch } from "react-redux";
import { DispatchType } from "../../../redux/configStore";
import { useSearchParams } from "react-router-dom";

type TypeCheckOptions = {
  [key: string]: boolean;
};

type TypeFilter = {
  categories?: string;
  minPrice?: number;
  maxPrice?: number;
  [key: string]: any;
};

type Props = {
  handleOnLoading: () => void;
  handleOffLoading: () => void;
};

export default function FilterDoctorParamsURL(props: Props) {
  const { handleOnLoading, handleOffLoading } = props;

  const dispatch: DispatchType = useDispatch();

  // const [categories, setCategories] = useState<ICategory[]>();

  const checkFilterInitial = useRef(true);

  const [categoryCheck, setCategoryCheck] = useState<TypeCheckOptions>({});

  const [filterParams, setFilterParams] = useSearchParams();

  const getAllCategories = async () => {
    const arrCategory = await getAllCategoryService();
    // setCategories(arrCategory);
    createInitialCategoryCheck(arrCategory);
  };

  const createInitialCategoryCheck = (arrCategory: ICategory[]) => {
    const arrNameCategory = arrCategory?.map((item) => item.name);
    const initialCategoryCheck: TypeCheckOptions = {};
    arrNameCategory?.forEach((item) => {
      initialCategoryCheck[item] = false;
    });

    setCategoryCheck(initialCategoryCheck);

    return initialCategoryCheck;
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  const filterDoctorApi = async (
    categories: string,
    minPrice: number,
    maxPrice: number
  ) => {
    handleOnLoading();

    await dispatch(
      filterMedicalExaminationTimeThunkByCategoryAndPrice(
        categories,
        minPrice,
        maxPrice
      )
    );
    handleOffLoading();
  };

  const formik = useFormik<IMedicalExaminationFilter>({
    initialValues: {
      category: [],
      minPrice: 0,
      maxPrice: 999999999999,
    },
    onSubmit: (values) => {
      filterParams.delete("nameDoctor");

      let { category, minPrice, maxPrice } = values;
      const objCategoryCheck = { ...categoryCheck };
      const arrCategory = Object.keys(objCategoryCheck).filter(
        (item) => objCategoryCheck[item]
      );

      filterDoctorApi(arrCategory.join(","), minPrice, maxPrice);

      filterParams.set("minPrice", `${minPrice}`);
      filterParams.set("maxPrice", `${maxPrice}`);
      setFilterParams(filterParams);
    },
  });

  const { handleChange, handleSubmit, setFieldValue, values } = formik;

  const handleChangeCheckbox = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleChange(event);
    const objCategoryCheck = { ...categoryCheck };
    objCategoryCheck[event.target.value] = event.target.checked;
    const arrCategory = Object.keys(objCategoryCheck).filter(
      (item) => objCategoryCheck[item]
    );

    filterParams.delete("nameDoctor");
    const paramsMinPrice = filterParams.get("minPrice");
    const paramsMaxPrice = filterParams.get("maxPrice");
    values.minPrice = paramsMinPrice ? +paramsMinPrice : 0;
    values.maxPrice = paramsMaxPrice ? +paramsMaxPrice : 999999999999;

    setFieldValue("minPrice", values.minPrice);
    setFieldValue("maxPrice", values.maxPrice);
    filterDoctorApi(arrCategory.join(","), values.minPrice, values.maxPrice);

    arrCategory.length === 0
      ? filterParams.delete("categories")
      : filterParams.set("categories", arrCategory.join(","));
    setFilterParams(filterParams);

    setCategoryCheck(objCategoryCheck);
  };

  const getFilterURL = () => {
    const params: TypeFilter = {};

    filterParams.forEach((value, key) => {
      params[key] = value;
    });

    if (Object.keys(categoryCheck).length !== 0 && checkFilterInitial.current) {
      filterDoctorParamsURL(params);
      checkFilterInitial.current = false;
    }

    let arrCategoryURL = params.categories?.split(",");

    arrCategoryURL?.map((nameCategoryURL) => {
      categoryCheck[nameCategoryURL] = true;
    });

    values.minPrice = params.minPrice ? +params.minPrice : 0;
    values.maxPrice = params.maxPrice ? +params.maxPrice : 999999999999;
  };

  const filterDoctorParamsURL = (params: TypeFilter) => {
    let { categories, minPrice, maxPrice } = params;

    categories = categories ?? "";
    minPrice = minPrice ? +minPrice : 0;
    maxPrice = maxPrice ? +maxPrice : 999999999999;
    if (categories || params.minPrice) {
      filterDoctorApi(categories as string, Number(minPrice), Number(maxPrice));
    }
  };

  const setFilterInitial = () => {
    const nameDoctor = filterParams.get("nameDoctor");

    if (nameDoctor) {
      let categoryInitial: TypeCheckOptions = {};

      Object.keys(categoryCheck).map((nameCategory) => {
        categoryInitial[nameCategory] = false;
        categoryCheck[nameCategory] = false;
      });

      setCategoryCheck(categoryInitial);

      values.minPrice = 0;
      values.maxPrice = 999999999999;
    }
  };

  useEffect(() => {
    getFilterURL();
  }, [categoryCheck]);

  useEffect(() => {
    setFilterInitial();
  }, [filterParams]);

  return (
    <div className="filter__container">
      <form action="" className="form__filter" onSubmit={handleSubmit}>
        <div className="select__form-object filter__doctor">
          <div className="filter__header">
            <h3>Categories</h3>
          </div>
          <div className="filter__widget filter__checkbox">
            {Object.keys(categoryCheck)?.map((nameCategory: string, index) => {
              return (
                <div key={index}>
                  <label className="custom_check">
                    <input
                      onChange={handleChangeCheckbox}
                      type="checkbox"
                      name="category"
                      value={nameCategory}
                      checked={categoryCheck[nameCategory]}
                    />
                    <span className="checkmark" /> {nameCategory}
                  </label>
                </div>
              );
            })}
          </div>
        </div>

        <div className="form__price__range filter__doctor">
          <div className="filter__header">
            <h3> Examination Price Range</h3>
          </div>
          <div className="container__price__range filter__widget">
            <CurrencyInput
              placeholder="$0"
              name="minPrice"
              className="input__price min__price"
              intlConfig={{ locale: "en-US", currency: "USD" }}
              onValueChange={(value) => {
                !value
                  ? setFieldValue("minPrice", 0)
                  : setFieldValue("minPrice", Number(value));
              }}
              value={values.minPrice === 0 ? "" : values.minPrice}
            />
            <span className="separator__symbol">-</span>

            <CurrencyInput
              placeholder="$999,999,999,999"
              onValueChange={(value) => {
                !value
                  ? setFieldValue("maxPrice", 999999999999)
                  : setFieldValue("maxPrice", Number(value));
              }}
              name="maxPrice"
              className="input__price max__price"
              intlConfig={{ locale: "en-US", currency: "USD" }}
              value={values.maxPrice === 999999999999 ? "" : values.maxPrice}
            />
          </div>
          <Button type="submit" text="Apply" className="btn__apply" />
        </div>
      </form>
    </div>
  );
}
