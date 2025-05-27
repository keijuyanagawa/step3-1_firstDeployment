"use client";
import { useRef, useState } from "react";   //１．useStateをimport
import { useRouter } from "next/navigation";

import createCustomer from "./createCustomer";

export default function CreatePage() {
  const formRef = useRef();
  const router = useRouter();
  const [error, setError] = useState('');   //２．useStateを定義

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(formRef.current);

    //３．customer_idをチェック用に取得
    const customerId_check = formData.get("customer_id");

    //４．バリデーション追加
    const customerId = typeof customerId_check === "string" ? customerId_check.trim() : "";
    
    //５．customerIdの値として成立しているか判断（値として成立していなければエラーメッセージ取得）
    if(!customerId){
      setError('Customer IDが空欄のため作成できません。')
      return;
    }

    //６．エラー解除
    setError('');

    await createCustomer(formData);

    //７．ルーティングを修正
    // router.push(`./create/confirm?customer_id=${formData.get("customer_id")}`);
    router.push(`./create/confirm?customer_id=${customerId}`);
  };

  return (
    <>
      <div className="card bordered bg-white border-blue-200 border-2 max-w-md m-4">
        <div className="m-4 card bordered bg-blue-200 duration-200 hover:border-r-red">
          <form ref={formRef} onSubmit={handleSubmit}>
            <div className="card-body">
              <h2 className="card-title">
                <p>
                  <input
                    type="text"
                    name="customer_name"
                    placeholder="桃太郎"
                    className="input input-bordered"
                  />
                </p>
              </h2>
              <p>
                Customer ID:
                <input
                  type="text"
                  name="customer_id"
                  placeholder="C030"
                  className="input input-bordered"
                />
              </p>
              {/* ８．エラー表示（条件付き） */}
              {error && <p className="text-red-600">{error}</p>}
              <p>
                Age:
                <input
                  type="number"
                  name="age"
                  placeholder="30"
                  className="input input-bordered"
                />
              </p>
              <p>
                Gender:
                <input
                  type="text"
                  name="gender"
                  placeholder="女"
                  className="input input-bordered"
                />
              </p>

            </div>
            <div className="flex justify-center">
              <button type="submit" className="btn btn-primary m-4 text-2xl">
                作成
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
