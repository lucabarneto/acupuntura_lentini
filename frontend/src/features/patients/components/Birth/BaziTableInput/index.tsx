type Props = {
  heading: string;
  nestedRows?: true;
};
export const BaziTableInput = ({ heading, nestedRows }: Props) => {
  return nestedRows ? (
    <>
      <tr>
        <th rowSpan={3}>{heading}</th>
        <td>
          <input type="text" />
        </td>
        <td>
          <input type="text" />
        </td>
        <td>
          <input type="text" />
        </td>
        <td>
          <input type="text" />
        </td>
      </tr>
      <tr>
        <td>
          <input type="text" />
        </td>
        <td>
          <input type="text" />
        </td>
        <td>
          <input type="text" />
        </td>
        <td>
          <input type="text" />
        </td>
      </tr>
      <tr>
        <td>
          <input type="text" />
        </td>
        <td>
          <input type="text" />
        </td>
        <td>
          <input type="text" />
        </td>
        <td>
          <input type="text" />
        </td>
      </tr>
    </>
  ) : (
    <tr>
      <th>{heading}</th>
      <td>
        <input type="text" />
      </td>
      <td>
        <input type="text" />
      </td>
      <td>
        <input type="text" />
      </td>
      <td>
        <input type="text" />
      </td>
    </tr>
  );
};
