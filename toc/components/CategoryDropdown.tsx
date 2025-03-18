import { useState } from "react";

// A dropdown for categories such as "Category", "Review", "Posted Date"
const CategoryDropdown = () => {
    const [categoryName, setCategoryName] = useState("Select ▼");

    return (
        <div className="dropdown dropdown-bottom dropdown-center mr-2">
            <button className="btn btn-outline btn-wide btn-circle dropdown-toggle">
                {categoryName}
            </button>
            <ul className="dropdown-content menu bg-base-100 rounded-box z-[1] p-2 shadow w-full">
                <li><button onClick={(e) => checkAndCloseDropDown(e, "Category ▼", setCategoryName)}>Category</button></li>
                <li><button onClick={(e) => checkAndCloseDropDown(e, "Review ▼", setCategoryName)}>Review</button></li>
                <li><button onClick={(e) => checkAndCloseDropDown(e, "Posted Date ▼", setCategoryName)}>Posted Date</button></li>
            </ul>
        </div>
    );
}

export default CategoryDropdown;

// Manually close a dropdown
function checkAndCloseDropDown(
    e: React.MouseEvent<HTMLButtonElement>,
    val: String,
    setCategoryName: React.Dispatch<React.SetStateAction<string>>
) {
    let targetEl = e.currentTarget;
    if (targetEl && targetEl.matches(':focus')) {
        setCategoryName("" + val);
        setTimeout(function () {
            targetEl.blur();
        }, 0);
    }
}