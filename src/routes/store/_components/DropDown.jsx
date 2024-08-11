import PropTypes from 'prop-types';
import { capitalize } from '../../_lib/utils';

export default function DropDown({ options, name, icon, children, ...props }) {
  return (
    <div className="relative box-border overflow-hidden rounded-md border-solid text-sm font-medium focus-within:border lg:shadow-md">
      <div className="pointer-events-none absolute flex h-full items-center pl-2">
        <span>{icon()}</span>
      </div>
      <select
        name={name}
        className="cursor-pointer overflow-hidden text-ellipsis bg-white py-2 pl-10 pr-2 outline-none"
        {...props}
      >
        <option value="">{children}</option>

        {options.map((item, i) => (
          <option key={i} value={item}>
            {capitalize(item)}
          </option>
        ))}
      </select>
    </div>
  );
}

DropDown.propTypes = {
  options: PropTypes.arrayOf(PropTypes.string),
  name: PropTypes.string,
  icon: PropTypes.func,
  children: PropTypes.node
};
